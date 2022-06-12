import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import DatasetBar from './DatasetBar';

const data = [
    { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
    { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
    { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
    { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 },
];

export default {
    title: 'Dataset Bar',
    component: DatasetBar,
    argTypes: {
        data: {
            description: 'Data for datasetBar chart',
            default: data,
        },
    },
} as ComponentMeta<typeof DatasetBar>;

const Template: ComponentStory<typeof DatasetBar> = (args) => (
    <DatasetBar {...args} />
);

export const Bar = Template.bind({});
Bar.args = {
    data,
};
