import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Dashboard from './Dashboard';

export default {
    title: 'Dashboard',
    component: Dashboard,
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = () => (
    <Dashboard>
        <div
            style={{
                backgroundColor: 'grey',
                textAlign: 'center',
            }}
            key='a'
            data-grid={{
                x: 0,
                y: 0,
                w: 1,
                h: 2,
                minW: 2,
                maxW: 4,
            }}
        >
            First
        </div>
        <div
            style={{
                backgroundColor: 'grey',
                textAlign: 'center',
            }}
            key='b'
            data-grid={{
                x: 1,
                y: 0,
                w: 3,
                h: 2,
                minW: 2,
                maxW: 4,
            }}
        >
            Second
        </div>
        <div
            style={{
                backgroundColor: 'grey',
                textAlign: 'center',
            }}
            key='c'
            data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
        >
            Third
        </div>
    </Dashboard>
);

export const GridStack = Template.bind({});
GridStack.args = {};
