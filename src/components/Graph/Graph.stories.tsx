import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Graph from './Graph';

export default {
    title: 'Graph',
    component: Graph,
    argTypes: {
        orientation: {
            type: 'string',
            description: 'Graph appearance option',
            defaultValue: 'horizontal',
        },
    },
} as ComponentMeta<typeof Graph>;

const Template: ComponentStory<typeof Graph> = () => <Graph />;

export const CardGraph = Template.bind({});
