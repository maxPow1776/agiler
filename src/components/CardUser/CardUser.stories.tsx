import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CardUser from './CardUser';

const user = {
    name: 'Ivan Ivanov',
    job: 'developer',
    city: 'Moscow',
    email: 'ivanov@gmail.com',
};

export default {
    title: 'Card User',
    component: CardUser,
    argTypes: {
        orientation: {
            type: 'string',
            description: 'User card appearance option',
            defaultValue: 'vertical',
            options: ['vertical', 'horizontal'],
            control: {
                type: 'inline-radio',
            },
        },
        user: {
            description: 'User data',
            default: user,
        },
    },
} as ComponentMeta<typeof CardUser>;

const Template: ComponentStory<typeof CardUser> = (args) => (
    <CardUser {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    user,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
    user,
};
