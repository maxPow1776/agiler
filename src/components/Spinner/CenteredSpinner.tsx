import React from 'react';
import { Spin, SpinProps } from 'antd';
import styles from './CenteredSpinner.module.css';

export const CenteredSpinner = (props: SpinProps) => {
    return (
        <div className={styles.enteredSpinnerContainer}>
            <Spin {...props} />
        </div>
    );
};
