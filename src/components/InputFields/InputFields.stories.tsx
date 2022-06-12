import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import InputFields from './InputFields';

const options = ['Team 1', 'Team 2', 'Team 3'];

export default {
    title: 'Input Fields',
    component: InputFields,
    argTypes: {
        options: {
            description: 'Select options',
            default: options,
        },
    },
} as ComponentMeta<typeof InputFields>;

const Template: ComponentStory<typeof InputFields> = (args) => (
    <InputFields {...args} />
);

export const SelectAndDate = Template.bind({});
SelectAndDate.args = {
    options,
};

export const Date = Template.bind({});
