import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { ProfileContext } from '../../context/ProfileContext';
import { SynchronizationContext } from '../../context/SynchronizationContext';
import { getJWT } from '../../utils/auth';
import { GATEWAY_HOST } from '../../utils/properties';
import Bar from '../BarChart/Bar';
import { SpinnerForChart } from '../SpinnerForChart/SpinnerForChart';

type IIssue = {
    resolutiondate: string;
    assignee: string;
};

const ThroughputHistogram = () => {
    const profile = useContext(ProfileContext);
    const synchronization = useContext(SynchronizationContext);
    const jwt = getJWT();
    const [searchParams] = useSearchParams();
    const [startDate, setStartDate] = useState(moment().subtract(1, 'month'));
    const [endDate, setEndDate] = useState(moment());
    const [developer, setDeveloper] = useState<string | undefined>(
        profile.email
    );

    useEffect(() => {
        if (
            profile.role?.name.toLowerCase() === 'manager' &&
            searchParams.get('developer')
        ) {
            setDeveloper(searchParams.get('developer')!.replace('%40', '@'));
        } else {
            setDeveloper(profile.email);
        }
        if (searchParams.get('startDate') && searchParams.get('endDate')) {
            const startDateFromUrl = searchParams.get('startDate')?.split('.');
            setStartDate(
                moment(
                    `${startDateFromUrl![1]}.${startDateFromUrl![0]}.${
                        startDateFromUrl![2]
                    }`
                )
            );
            const endDateFromUrl = searchParams.get('endDate')?.split('.');
            setEndDate(
                moment(
                    `${endDateFromUrl![1]}.${endDateFromUrl![0]}.${
                        endDateFromUrl![2]
                    }`
                )
            );
        } else {
            setStartDate(moment().subtract(1, 'month'));
            setEndDate(moment());
        }
    }, [searchParams]);

    const { isLoading, data } = useQuery<IIssue[] | null>(
        [`get-throughput-histogram`],
        () => {
            return fetch(
                `${GATEWAY_HOST}/charts?synchronizationid=${synchronization}&_limit=-1`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        'Content-Type': 'application/json',
                    },
                }
            ).then((res) => res.json());
        },
        {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
            retry: false,
            initialData: null,
        }
    );

    const getData = () => {
        const counts: number[] = [];
        if (data && data.length !== 0) {
            const filteredIssues = data.filter(
                (issue) => issue.assignee === developer
            );
            for (let i = startDate.week(); i < endDate.week(); i++) {
                const count = filteredIssues
                    .filter((issue) => issue.resolutiondate)
                    .filter((issue) => moment(issue.resolutiondate).week() >= i)
                    .filter(
                        (issue) => moment(issue.resolutiondate).week() < i + 1
                    ).length;
                counts.push(count);
            }
        }
        const minCount =
            Math.min.apply(null, counts) === 0
                ? 1
                : Math.min.apply(null, counts);
        const maxCount = Math.max.apply(null, counts);
        const labels = [];
        const values = [];
        for (let i = minCount; i <= maxCount; i++) {
            labels.push(i.toString());
            let weeksCount = 0;
            counts.forEach((c) => {
                if (+i === c) weeksCount++;
            });
            values.push(weeksCount);
        }
        if (labels.length === 0) {
            labels.push('0');
            values.push(0);
        }
        return {
            title: 'Throughput Histogram',
            labels,
            values: [values],
        };
    };

    return isLoading || !data ? <SpinnerForChart /> : <Bar data={getData()} />;
};

export default ThroughputHistogram;
