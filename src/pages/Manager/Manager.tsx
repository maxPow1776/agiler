import React, { useContext, useEffect, useReducer } from 'react';
import { DatePicker, Select, PageHeader } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';
import { useQuery } from 'react-query';
import { IProfile, ProfileContext } from '../../context/ProfileContext';
import { GATEWAY_HOST } from '../../utils/properties';
import { getJWT } from '../../utils/auth';
import { CenteredSpinner } from '../../components/Spinner/CenteredSpinner';
import GridStack from '../../components/Gridstack/Gridstack';
import s from './Manager.module.css';

const { RangePicker }: any = DatePicker;

type ManagerStateType = {
    developer: string | null;
    startDate: any | null;
    endDate: any | null;
};

type ManagerAction = {
    type: string;
    data: string | null;
};

type SearchParamsType = {
    developer?: string;
    startDate?: any;
    endDate?: any;
};

// const group = {
//     name: 'Team #1',
//     duty: 'Frontend development',
//     location: 'Russia, Voronezh',
// };

const initialState: ManagerStateType = {
    developer: null,
    startDate: null,
    endDate: null,
};

const reducer = (
    state: ManagerStateType,
    action: ManagerAction
): ManagerStateType => {
    switch (action.type) {
        case 'CHANGE_DEVELOPER':
            return { ...state, developer: action.data };
        case 'CHANGE_START_DATE':
            return { ...state, startDate: action.data };
        case 'CHANGE_END_DATE':
            return { ...state, endDate: action.data };
        default:
            return state;
    }
};

const Manager = () => {
    const dateFormatList = 'DD.MM.YYYY';
    const [state, dispatch] = useReducer(reducer, initialState);
    const [searchParams, setSearchParams] = useSearchParams();
    const { developer, startDate, endDate } = state;
    const jwt = getJWT();
    const profile = useContext(ProfileContext);
    const navigate = useNavigate();

    const selectHandler = (value: string) => {
        let newSearchParams: SearchParamsType = { developer: value };
        if (startDate)
            newSearchParams.startDate = startDate.format(dateFormatList);
        if (endDate) newSearchParams.endDate = endDate.format(dateFormatList);

        dispatch({ type: 'CHANGE_DEVELOPER', data: value });

        setSearchParams(newSearchParams);
    };

    const dateHandler = (value: any) => {
        let newSearchParams: SearchParamsType = {
            startDate: value[0].format(dateFormatList),
            endDate: value[1].format(dateFormatList),
        };

        dispatch({ type: 'CHANGE_START_DATE', data: value[0] });
        dispatch({ type: 'CHANGE_END_DATE', data: value[1] });

        if (developer) newSearchParams.developer = developer;

        setSearchParams(newSearchParams);
    };

    const selectAndDateHandler = (
        initialDeveloper: string,
        initialStartDate: any,
        initialEndDate: any
    ) => {
        dispatch({ type: 'CHANGE_DEVELOPER', data: initialDeveloper });
        dispatch({ type: 'CHANGE_START_DATE', data: initialStartDate });
        dispatch({ type: 'CHANGE_END_DATE', data: initialEndDate });
        setSearchParams({
            developer: initialDeveloper,
            startDate: initialStartDate.format(dateFormatList),
            endDate: initialEndDate.format(dateFormatList),
        });
    };

    useEffect(() => {
        if (profile.role?.name.toLowerCase() === 'developer')
            return navigate('/403');
        const newDeveloper = searchParams.get('developer')
            ? searchParams.get('developer')
            : profile.email;
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
        selectAndDateHandler(newDeveloper!, newStartDate, newEndDate);
    }, []);

    const { isLoading: isUsersLoading, data: users } = useQuery(
        [`get-users`],
        () =>
            fetch(`${GATEWAY_HOST}/users`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json()),
        {
            // The query will not execute until the userId exists
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
            retry: false,
            initialData: null,
        }
    );

    return !users ||
        isUsersLoading ||
        profile.role?.name.toLowerCase() === 'developer' ? (
        <CenteredSpinner />
    ) : (
        <>
            <PageHeader
                className={s.sitePageHeader}
                title='My dashboard'
                ghost={false}
                extra={[
                    <Select
                        allowClear
                        placeholder={'Developer'}
                        value={developer}
                        style={{ width: 200 }}
                        onSelect={selectHandler}
                    >
                        {users
                            ? users!.map((user: IProfile, index: number) => (
                                  <Select.Option key={index} value={user.email}>
                                      {`${user.firstname} ${user.lastname}`}
                                  </Select.Option>
                              ))
                            : null}
                    </Select>,
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

export default Manager;
