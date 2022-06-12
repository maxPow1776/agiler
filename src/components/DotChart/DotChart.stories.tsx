import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import DotChart from './DotChart';

// prettier-ignore
const data = {
    pointData: [
        ['Blouse "Blue Viola"', 101.88, 99.75, 76.75, 116.75, 69.88, 119.88],
        ['Dress "Daisy"', 155.8, 144.03, 126.03, 156.03, 129.8, 188.8],
        ['Trousers "Cutesy Classic"', 203.25, 173.56, 151.56, 187.56, 183.25, 249.25],
        ['Dress "Morning Dew"', 256, 120.5, 98.5, 136.5, 236, 279],
        ['Turtleneck "Dark Chocolate"', 408.89, 294.75, 276.75, 316.75, 385.89, 427.89],
        ['Jumper "Early Spring"', 427.36, 430.24, 407.24, 452.24, 399.36, 461.36],
        ['Breeches "Summer Mood"', 356, 135.5, 123.5, 151.5, 333, 387],
        ['Dress "Mauve Chamomile"', 406, 95.5, 73.5, 111.5, 366, 429],
        ['Dress "Flying Tits"', 527.36, 503.24, 488.24, 525.24, 485.36, 551.36],
        ['Dress "Singing Nightingales"', 587.36, 543.24, 518.24, 555.24, 559.36, 624.36],
        ['Sundress "Cloudy weather"', 603.36, 407.24, 392.24, 419.24, 581.36, 627.36],
        ['Sundress "East motives"', 633.36, 477.24, 445.24, 487.24, 594.36, 652.36],
        ['Sweater "Cold morning"', 517.36, 437.24, 416.24, 454.24, 488.36, 565.36],
        ['Trousers "Lavender Fields"', 443.36, 387.24, 370.24, 413.24,  412.36, 484.36],
        ['Jumper "Coffee with Milk"', 543.36, 307.24, 288.24, 317.24, 509.36, 574.36],
        ['Blouse "Blooming Cactus"', 790.36, 277.24, 254.24, 295.24, 764.36, 818.36],
    ],
    dimensions: [
        'name',
        'Price',
        'Prime cost',
        'Prime cost min',
        'Prime cost max',
        'Price min',
        'Price max',
    ],
};

export default {
    title: 'Dot gpaph',
    component: DotChart,
    argTypes: {
        data: {
            description: 'Data for dot chart',
            default: data,
        },
    },
} as ComponentMeta<typeof DotChart>;

const Template: ComponentStory<typeof DotChart> = (args) => (
    <DotChart {...args} />
);

export const DotGraph = Template.bind({});
DotGraph.args = { data };
