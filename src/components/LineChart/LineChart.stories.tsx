import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import LineChart from './LineChart';

const data = [
    { time: 'Mon', data: 150 },
    { time: 'Tue', data: 230 },
    { time: 'Wed', data: 224 },
    { time: 'Thu', data: 218 },
    { time: 'Fri', data: 135 },
    { time: 'Sat', data: 147 },
    { time: 'Sun', data: 260 },
];

export default {
    title: 'Line',
    component: LineChart,
    argTypes: {
        data: {
            description: 'Data for line chart',
            default: data,
        },
    },
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => (
    <LineChart {...args} />
);

export const Line = Template.bind({});
Line.args = { data, smooth: false };

export const Smooth = Template.bind({});
Smooth.args = { data, smooth: true };
