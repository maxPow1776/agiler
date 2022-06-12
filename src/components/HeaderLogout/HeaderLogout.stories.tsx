import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import HeaderLogout from './HeaderLogout';

export default {
    title: 'Header Logout',
    component: HeaderLogout,
    argTypes: {
        orientation: {
            description: 'Header Logout appearance option',
        },
    },
} as ComponentMeta<typeof HeaderLogout>;

const Template: ComponentStory<typeof HeaderLogout> = () => <HeaderLogout />;

export const Component = Template.bind({});
