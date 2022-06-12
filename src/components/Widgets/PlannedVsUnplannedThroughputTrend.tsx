import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { ProfileContext } from '../../context/ProfileContext';
import { SynchronizationContext } from '../../context/SynchronizationContext';
import { getJWT } from '../../utils/auth';
import { GATEWAY_HOST } from '../../utils/properties';
import StackedLine from '../Charts/StackedLine/StackedLine';
import { SpinnerForChart } from '../SpinnerForChart/SpinnerForChart';

type IIssue = {
    resolutiondate: string;
    assignee: string;
    type: string;
};

const PlannedVsUnplannedThroughputTrend = () => {
    const user = useContext(ProfileContext);
    const synchronization = useContext(SynchronizationContext);
    const jwt = getJWT();
    const [searchParams] = useSearchParams();
    const [startDate, setStartDate] = useState(moment().subtract(1, 'month'));
    const [endDate, setEndDate] = useState(moment());
    const [developer, setDeveloper] = useState<string | undefined>(user.email);

    useEffect(() => {
        if (
            user.role?.name.toLowerCase() === 'manager' &&
            searchParams.get('developer')
        ) {
            setDeveloper(searchParams.get('developer')!.replace('%40', '@'));
        } else {
            setDeveloper(user.email);
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

    const getTime = () => {
        const labels = [];
        const year = startDate.year();
        for (let i = startDate.week(); i < endDate.week(); i++) {
            labels.push(`${year}-${i}`);
        }
        return labels;
    };

    const getData = () => {
        const result: { data: number[]; name: string }[] = [];
        const labels = [];
        const storiesData: { data: number[]; name: string } = {
            data: [],
            name: 'story',
        };
        const bugsData: { data: number[]; name: string } = {
            data: [],
            name: 'bug',
        };
        if (data && data.length !== 0) {
            const filteredStories = data
                .filter((issue) => issue.assignee === developer)
                .filter((issue) => issue.type === 'story')
                .filter((issue) => issue.resolutiondate)
                .filter((issue) => moment(issue.resolutiondate) >= startDate)
                .filter((issue) => moment(issue.resolutiondate) <= endDate);
            const filteredBugs = data
                .filter((issue) => issue.assignee === developer)
                .filter((issue) => issue.type === 'bug')
                .filter((issue) => issue.resolutiondate)
                .filter((issue) => moment(issue.resolutiondate) >= startDate)
                .filter((issue) => moment(issue.resolutiondate) <= endDate);
            const stories: number[] = [];
            const bugs: number[] = [];
            const year = startDate.year();
            for (let i = startDate.week(); i < endDate.week(); i++) {
                labels.push(`${year}-${i}`);
                stories.push(
                    filteredStories.filter(
                        (issue) => moment(issue.resolutiondate).week() == i
                    ).length
                );
                bugs.push(
                    filteredBugs.filter(
                        (issue) => moment(issue.resolutiondate).week() == i
                    ).length
                );
            }
            labels.forEach((_, index) => storiesData.data.push(stories[index]));
            labels.forEach((_, index) => bugsData.data.push(bugs[index]));
            result.push(storiesData);
            result.push(bugsData);
        }
        return result;
    };

    return isLoading || !data ? (
        <SpinnerForChart />
    ) : (
        <StackedLine
            data={getData()}
            time={getTime()}
            title={'Planned Versus Unplanned Throughput Trend'}
        />
    );
};

export default PlannedVsUnplannedThroughputTrend;
