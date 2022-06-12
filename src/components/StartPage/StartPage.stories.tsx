import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import StartPage from './StartPage';

export default {
    title: 'Start Page',
    component: StartPage,
    argTypes: {
        orientation: {
            description: 'Start Page appearance option',
        },
    },
} as ComponentMeta<typeof StartPage>;

const Template: ComponentStory<typeof StartPage> = () => <StartPage />;

export const ComponentStartPage = Template.bind({});
