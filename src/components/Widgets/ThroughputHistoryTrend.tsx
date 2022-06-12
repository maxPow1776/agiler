import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { ProfileContext } from '../../context/ProfileContext';
import { SynchronizationContext } from '../../context/SynchronizationContext';
import { getJWT } from '../../utils/auth';
import { GATEWAY_HOST } from '../../utils/properties';
import LineChart from '../LineChart/LineChart';
import { SpinnerForChart } from '../SpinnerForChart/SpinnerForChart';

type IIssue = {
    resolutiondate: string;
    assignee: string;
};

const ThroughputHistoryTrend = () => {
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
        [`get-throughput-history-trend`],
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
        const result: { time: string; data: number }[] = [];
        if (data && data.length !== 0) {
            const filteredIssues = data.filter(
                (issue) => issue.assignee === developer
            );
            const labels = [];
            const issues: number[] = [];
            const year = startDate.year();
            for (let i = startDate.week(); i < endDate.week(); i++) {
                labels.push(`${year}-${i}`);
                issues.push(
                    filteredIssues.filter(
                        (issue) => moment(issue.resolutiondate).week() == i
                    ).length
                );
            }

            labels.forEach((label, index) =>
                result.push({ time: label, data: issues[index] })
            );
        }
        return result;
    };

    return isLoading || !data ? (
        <SpinnerForChart />
    ) : (
        <LineChart
            data={getData()}
            smooth={false}
            withLine={true}
            title={'Throughput History Trend'}
        />
    );
};

export default ThroughputHistoryTrend;
