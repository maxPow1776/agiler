import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import SymbolicGraph from './SymbolicGraph';

const time = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const dataStories = [120, 200, 150, 80, 70, 110, 130];
const dataBugs = [120, 132, 101, 134, 90, 230, 210];

export default {
    title: 'Symbolic Graph chart',
    component: SymbolicGraph,
    argTypes: {
        data: {
            description: 'Data for bar chart',
            default: dataStories,
        },
    },
} as ComponentMeta<typeof SymbolicGraph>;

const Template: ComponentStory<typeof SymbolicGraph> = (args) => (
    <SymbolicGraph {...args} />
);

export const SymbolicGraphPlot = Template.bind({});
SymbolicGraphPlot.args = {
    dataStories,
    dataBugs,
    time,
};
