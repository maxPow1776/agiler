import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Pie from './Pie';

const data = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
];

export default {
    title: 'Pie',
    component: Pie,
    argTypes: {
        data: {
            description: 'Data for pie chart',
            default: data,
        },
    },
} as ComponentMeta<typeof Pie>;

const Template: ComponentStory<typeof Pie> = (args) => <Pie {...args} />;

export const PieChart = Template.bind({});
PieChart.args = {
    data,
};
