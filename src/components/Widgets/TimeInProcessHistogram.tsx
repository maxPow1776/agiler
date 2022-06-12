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
    created: string;
    resolutiondate: string;
    assignee: string;
};

const TimeInProcessHistogram = () => {
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
        [`get-time-in-process-histogram`],
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
        let diff: number[] = [];
        const labels: number[] = [];
        let count: number[] = [];
        if (data && data.length !== 0) {
            const filteredIssues = data
                .filter((issue) => issue.assignee === developer)
                .filter((issue) => moment(issue.created) >= startDate)
                .filter((issue) => moment(issue.created) <= endDate);
            filteredIssues.forEach((issue) => {
                diff.push(
                    moment(issue.resolutiondate).diff(
                        moment(issue.created),
                        'days'
                    )
                );
            });
            diff = diff.filter((l) => !isNaN(l));
            const minDiff = Math.min.apply(null, diff);
            const maxDiff = Math.max.apply(null, diff);
            for (let i = minDiff; i <= maxDiff; i++) labels.push(i);
            count = new Array(labels.length).fill(0);
            filteredIssues.forEach((issue) => {
                const currentDiff = moment(issue.resolutiondate).diff(
                    moment(issue.created),
                    'days'
                );
                if (!isNaN(currentDiff))
                    count[labels.indexOf(currentDiff)] += 1;
            });
        }
        return {
            title: 'Time In Process Histogram',
            labels: labels.map((l) => l.toString()),
            values: [count],
        };
    };

    return isLoading || !data ? <SpinnerForChart /> : <Bar data={getData()} />;
};

export default TimeInProcessHistogram;
