import React from 'react';
import GridLayout from 'react-grid-layout';
import './GridStack.css';

export type DashboardProps = {
    children: React.ReactNode;
};

const Dashboard = ({ children }: any) => {
    return (
        <GridLayout
            className='layout'
            style={{ background: '#f0f2f5' }}
            cols={15}
            rowHeight={30}
            width={1600}
        >
            {/* @ts-ignore */}
            {children}
        </GridLayout>
    );
};
export default Dashboard;
