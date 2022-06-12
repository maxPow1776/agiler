import { Card } from 'antd';
import React from 'react';

export type ChartCardProps = {
    children: JSX.Element;
};

const ChartCard = ({ children }: ChartCardProps) => {
    return <Card bodyStyle={{ padding: '0' }}>{children}</Card>;
};

export default ChartCard;
