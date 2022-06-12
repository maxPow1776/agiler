import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import StackedLine from './StackedLine';

const time = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const data = [
    {
        name: 'Email',
        data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
        name: 'Union Ads',
        data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
        name: 'Video Ads',
        data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
        name: 'Direct',
        data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
        name: 'Search Engine',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
];

export default {
    title: 'Stacked Line',
    component: StackedLine,
    argTypes: {
        data: {
            description: 'Data for stacked line chart',
            default: data,
        },
    },
} as ComponentMeta<typeof StackedLine>;

const Template: ComponentStory<typeof StackedLine> = (args) => (
    <StackedLine {...args} />
);

export const StackedLineChart = Template.bind({});
StackedLineChart.args = {
    data,
    time,
};
