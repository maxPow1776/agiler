import React from 'react';
import { Layout } from 'antd';
import { BasicProps } from 'antd/lib/layout/layout';
import styles from './Header.module.css';

const { Header: AntHeader } = Layout;

export const Header = (props: BasicProps) => {
    const { children } = props;
    return (
        <AntHeader className={styles.globalHeader} {...props}>
            <div className={styles.topNav}>
                <div className={styles.topNavMain}>{children}</div>
            </div>
        </AntHeader>
    );
};
