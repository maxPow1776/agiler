import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LargeChart, { ChartTypeDate } from './LargeChart';

const dataArr: ChartTypeDate = [
    [2311189200000, 949],
    [2311275600000, 500],
    [2311362000000, 200],
    [2311448400000, -500],
    [2311534800000, 300],
    [2311621200000, 962],
    [2311707600000, 180],
    [2311794000000, 975],
    [2311880400000, 130],
    [2311966800000, 6],
    [2312053200000, -800],
    [2312139600000, -2],
    [2312226000000, 976],
    [2312312400000, 984],
    [2312398800000, 988],
];

export default {
    title: 'Large Chart',
    component: LargeChart,
    argTypes: {
        data: {
            description: 'Data for large chart',
            default: dataArr,
        },
    },
} as ComponentMeta<typeof LargeChart>;

const Template: ComponentStory<typeof LargeChart> = (args) => (
    <LargeChart {...args} />
);

export const Chart = Template.bind({});
Chart.args = { options: dataArr };
