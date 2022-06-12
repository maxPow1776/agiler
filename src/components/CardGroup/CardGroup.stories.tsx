import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CardGroup from './CardGroup';

const group = [
    'Ivan Ivanov (Teamlead)',
    'Patya Petrov',
    'Anton Antonov',
    'Alice Malinova',
    'Eva Milton',
];

export default {
    title: 'Card Group',
    component: CardGroup,
    argTypes: {
        orientation: {
            type: 'string',
            description: 'Card Group appearance option',
        },
        user: {
            description: 'Group data',
            default: group,
        },
    },
} as ComponentMeta<typeof CardGroup>;

const Template: ComponentStory<typeof CardGroup> = (args) => (
    <CardGroup {...args} />
);

export const Card = Template.bind({});
Card.args = {
    group,
};
