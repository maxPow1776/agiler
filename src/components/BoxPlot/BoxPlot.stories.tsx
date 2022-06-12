import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import BoxPlt from './BoxPlot';

const data = [
    {
        name: 'boxplot',
        type: 'boxplot',
        datasetIndex: 1,
    },
    {
        name: 'outlier',
        type: 'scatter',
        datasetIndex: 2,
    },
];

export default {
    title: 'BoxPlot',
    component: BoxPlt,
    argTypes: {
        data: {
            description: 'BoxPlot chart',
            default: data,
        },
    },
} as ComponentMeta<typeof BoxPlt>;

const Template: ComponentStory<typeof BoxPlt> = (args) => <BoxPlt {...args} />;

export const BoxPltChart = Template.bind({});
BoxPltChart.args = {
    data,
};
