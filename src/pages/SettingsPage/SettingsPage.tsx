import React, { useContext, useState } from 'react';
import { Button, PageHeader, Table, Tag } from 'antd';
import { useQuery } from 'react-query';
import moment from 'moment';
import { SpinnerForChart } from '../../components/SpinnerForChart/SpinnerForChart';
import { getJWT } from '../../utils/auth';
import { GATEWAY_HOST } from '../../utils/properties';
import { ProfileContext } from '../../context/ProfileContext';
import Modal from '../../components/ModalWindow/Modal';
import s from './SettingsPage.module.css';

const SettingsPage = () => {
    const [btnSyncWait, setBtnSynsWait] = useState({
        type: 'default',
        loading: false,
    });
    const [isModal, setModal] = useState(false);

    const user = useContext(ProfileContext);
    const jwt = getJWT();
    const { isLoading, data, refetch } = useQuery(['get-data-for-sync'], () =>
        fetch(
            `${GATEWAY_HOST}/synchronizations?_sort=synchronizationdate:DESC&_limit=-1`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            }
        ).then((res) => res.json())
    );

    const onClose = () => {
        setModal(false);
        refetch();
    };

    const creatNewSync = async (jira: string, token: string) => {
        setBtnSynsWait({ type: 'primary', loading: true });
        await fetch(
            `${GATEWAY_HOST}/data?instance=${jira}&login=${user.email}&token=${token}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(() => setBtnSynsWait({ type: 'default', loading: false }))
            .then(() => onClose())
            .then(() => console.log('done'))
            .catch((error) => console.log(error));
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Synchronization date',
            dataIndex: 'syncDate',
            key: 'syncDate',
        },
        {
            title: 'Jira',
            dataIndex: 'jira',
            key: 'jira',
            render: (jira: string) => {
                if (jira !== 'null') {
                    return jira;
                } else {
                    return '-';
                }
            },
        },
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: 'Status',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: string) => {
                let color;
                if (tags === 'failed') {
                    color = 'volcano';
                } else if (tags === 'inprogress') {
                    color = 'orange';
                } else if (tags === 'null') {
                    return '-';
                } else {
                    color = 'green';
                }
                return (
                    <Tag color={color} key={tags}>
                        {tags === 'inprogress'
                            ? tags[0].toUpperCase() +
                              tags[1] +
                              ' ' +
                              tags[2].toUpperCase() +
                              tags.substring(3)
                            : tags[0].toUpperCase() + tags.substring(1)}
                    </Tag>
                );
            },
        },
    ];

    let dataTable: any[] = [];
    data?.map((item: any) => {
        dataTable.push({
            key: `${item.id}`,
            id: `${item.id}`,
            syncDate: `${moment(item.synchronizationdate).format(
                'DD.MM.YYYY'
            )}`,
            jira: `${item.jira}`,
            project: 'AG',
            tags: `${item.status}`,
        });
    });

    return isLoading || !data ? (
        <SpinnerForChart />
    ) : (
        <div>
            <PageHeader
                ghost={false}
                title='Settings'
                className={s.site__page_header}
                extra={
                    <Button key='1' onClick={() => setModal(true)}>
                        New Sync
                    </Button>
                }
            />
            <Modal
                visible={isModal}
                title='New Synchronization'
                btnType={btnSyncWait}
                onClose={onClose}
                createSync={creatNewSync}
            />
            <Table
                columns={columns}
                dataSource={dataTable}
                pagination={false}
                className={s.table}
            />
        </div>
    );
};

export default SettingsPage;
