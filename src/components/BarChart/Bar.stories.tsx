import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Bar from './Bar';

const data = {
    title: 'Stroybook bar',
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [
        [120, 200, 150, 80, 70, 110, 130],
        [100, 100, 200, 100, 50, 110, 130],
    ],
};

export default {
    title: 'Bar chart',
    component: Bar,
    argTypes: {
        data: {
            description: 'Data for bar chart',
            default: data,
        },
    },
} as ComponentMeta<typeof Bar>;

const Template: ComponentStory<typeof Bar> = (args) => <Bar {...args} />;

export const BarChart = Template.bind({});
BarChart.args = {
    data,
};
