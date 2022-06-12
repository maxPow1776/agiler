import React from 'react';
import { Spin, SpinProps } from 'antd';
import styles from './SpinnerForChart.module.css';

export const SpinnerForChart = (props: SpinProps) => {
    return (
        <div className={styles.enteredSpinnerContainer}>
            <Spin {...props} />
        </div>
    );
};
