import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import GeneralCardGroup from './GeneralCardGroup';

const group = {
    name: 'Team #1',
    duty: 'Frontend development',
    location: 'Russia, Voronezh',
};

export default {
    title: 'General Card Group',
    component: GeneralCardGroup,
    argTypes: {
        orientation: {
            type: 'string',
            description: 'General Card Group appearance option',
            defaultValue: 'vertical',
            options: ['vertical', 'horizontal'],
            control: {
                type: 'inline-radio',
            },
        },
        user: {
            description: 'Card data',
            default: group,
        },
    },
} as ComponentMeta<typeof GeneralCardGroup>;

const Template: ComponentStory<typeof GeneralCardGroup> = (args) => (
    <GeneralCardGroup {...args} />
);

export const CardVertical = Template.bind({});
CardVertical.args = {
    group,
};

export const CardHorizontal = Template.bind({});
CardHorizontal.args = {
    group,
};
