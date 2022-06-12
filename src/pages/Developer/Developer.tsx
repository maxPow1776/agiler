import React, { useEffect, useReducer } from 'react';
import { DatePicker, PageHeader } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';
import GridStack from '../../components/Gridstack/Gridstack';
import { CenteredSpinner } from '../../components/Spinner/CenteredSpinner';
import s from './Developer.module.css';

const { RangePicker }: any = DatePicker;

type DeveloperStateType = {
    startDate: any | null;
    endDate: any | null;
};

type DeveloperAction = {
    type: string;
    data: string | null;
};

type SearchParamsType = {
    startDate?: any;
    endDate?: any;
};

const initialState: DeveloperStateType = {
    startDate: null,
    endDate: null,
};

const reducer = (
    state: DeveloperStateType,
    action: DeveloperAction
): DeveloperStateType => {
    switch (action.type) {
        case 'CHANGE_START_DATE':
            return { ...state, startDate: action.data };
        case 'CHANGE_END_DATE':
            return { ...state, endDate: action.data };
        default:
            return state;
    }
};

const Developer = () => {
    const dateFormatList = 'DD.MM.YYYY';
    const [state, dispatch] = useReducer(reducer, initialState);
    const [searchParams, setSearchParams] = useSearchParams();
    const { startDate, endDate } = state;

    const dateHandler = (value: any) => {
        let newSearchParams: SearchParamsType = {
            startDate: value[0].format(dateFormatList),
            endDate: value[1].format(dateFormatList),
        };

        dispatch({ type: 'CHANGE_START_DATE', data: value[0] });
        dispatch({ type: 'CHANGE_END_DATE', data: value[1] });

        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        const newStartDate = searchParams.get('startDate')
            ? moment(
                  `${searchParams.get('startDate')!.split('.')[2]}-${
                      searchParams.get('startDate')!.split('.')[1]
                  }-${searchParams.get('startDate')!.split('.')[0]}`
              )
            : moment().subtract(1, 'month');
        const newEndDate = searchParams.get('endDate')
            ? moment(
                  `${searchParams.get('endDate')!.split('.')[2]}-${
                      searchParams.get('endDate')!.split('.')[1]
                  }-${searchParams.get('endDate')!.split('.')[0]}`
              )
            : moment();
        dateHandler([newStartDate, newEndDate]);
    }, []);

    return !startDate && !endDate ? (
        <CenteredSpinner />
    ) : (
        <>
            <PageHeader
                className={s.sitePageHeader}
                title='My dashboard'
                ghost={false}
                extra={[
                    <RangePicker
                        format={dateFormatList}
                        style={{ width: 330, marginLeft: 20 }}
                        value={[
                            (startDate && moment(startDate, dateFormatList)) ||
                                null,
                            (endDate && moment(endDate, dateFormatList)) ||
                                null,
                        ]}
                        onChange={dateHandler}
                    />,
                ]}
            />
            <GridStack />
        </>
    );
};

export default Developer;
