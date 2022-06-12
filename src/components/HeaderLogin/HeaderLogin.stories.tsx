import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import HeaderLogin from './HeaderLogin';

export default {
    title: 'Header Login',
    component: HeaderLogin,
    argTypes: {
        orientation: {
            description: 'Header Login appearance option',
        },
    },
} as ComponentMeta<typeof HeaderLogin>;

const Template: ComponentStory<typeof HeaderLogin> = () => <HeaderLogin />;

export const Component = Template.bind({});
