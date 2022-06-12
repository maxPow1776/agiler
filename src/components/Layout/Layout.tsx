import React, { useContext } from 'react';
import { Button, Dropdown, Layout as AntLayout, Menu, Space } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import {
    AppstoreOutlined,
    DownOutlined,
    IdcardOutlined,
    LogoutOutlined,
    PieChartOutlined,
    ProfileOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HeaderLogo } from '../Header/Logo';
import { Header } from '../Header/Header';
import { ProfileContext } from '../../context/ProfileContext';
import { getUserName } from '../../utils/user';
import { logout } from '../../utils/auth';
import styles from './Layout.module.css';

export const Layout = () => {
    const profile = useContext(ProfileContext);
    const role = profile.role!.name;
    let location = useLocation();
    const profileMenu = (
        <Menu>
            <Menu.Item key='profile' icon={<ProfileOutlined />}>
                <Link to='/profile'>Profile</Link>
            </Menu.Item>
            <Menu.Item key='settings' icon={<SettingOutlined />}>
                <Link to='/settings'>Settings</Link>
            </Menu.Item>
            <Menu.Item
                key='exit'
                icon={<LogoutOutlined />}
                onClick={() => logout()}
            >
                Logout
            </Menu.Item>
        </Menu>
    );
    const headerMenu = (
        <Menu
            theme='light'
            mode='horizontal'
            selectedKeys={[location.pathname]}
            overflowedIndicator={<AppstoreOutlined />}
        >
            <Menu.Item key={`/${role}`} icon={<PieChartOutlined />}>
                <Link to={`/${role}`}>Dashboard</Link>
            </Menu.Item>
        </Menu>
    );
    const headerCollapsedMenu = (
        <Menu
            theme='light'
            selectedKeys={[`${location.pathname}-xs`]}
            overflowedIndicator={<AppstoreOutlined />}
        >
            <Menu.Item key={`/${role}-xs`} icon={<IdcardOutlined />}>
                <Link to={`/${role}`}>Dashboard</Link>
            </Menu.Item>
        </Menu>
    );
    return (
        <AntLayout className='layout'>
            <Header>
                <HeaderLogo />
                <div className={styles.headerMenu}>{headerMenu}</div>
                <div className={styles.headerRightContent}>
                    <Space size={8} className={styles.headerRightContentPanel}>
                        <Dropdown
                            overlay={headerCollapsedMenu}
                            placement='bottomRight'
                            trigger={['click']}
                            className={styles.headerCollapsedMenu}
                        >
                            <Button
                                type='text'
                                style={{ height: '48px', padding: 0 }}
                            >
                                Menu <DownOutlined />
                            </Button>
                        </Dropdown>

                        <Dropdown
                            overlay={profileMenu}
                            placement='bottomRight'
                            trigger={['click']}
                        >
                            <Button
                                type='text'
                                icon={<UserOutlined />}
                                style={{ height: '48px', padding: 0 }}
                            >
                                {getUserName(profile)} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                </div>
            </Header>

            <Content style={{ marginTop: 60 }}>
                <Outlet />
            </Content>
            <AntLayout.Footer style={{ backgroundColor: 'black' }}>
                <div className={styles.footer}>
                    <p>Ⓒ 2022, Agiler https://agiler.better-call-soul.com/</p>
                    <HeaderLogo />
                </div>
            </AntLayout.Footer>
        </AntLayout>
    );
};
