import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface BoxProps {
    data: {
        name: string;
        type: string;
        datasetIndex: number;
    }[];
    size: { height: string; width: string; margin: string };
}

const BoxPlot: React.FC<BoxProps> = ({ data, size }) => {
    const getOption = () => ({
        title: [
            {
                text: 'BoxPlot chart',
                left: 'center',
            },
        ],
        dataset: [
            {
                // prettier-ignore
                source: [
                    [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                    [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
                    [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
                    [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
                    [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
                ],
            },
            {
                transform: {
                    type: 'boxplot',
                    config: { itemNameFormatter: 'expr {value}' },
                },
            },
            {
                fromDatasetIndex: 1,
                fromTransformResult: 1,
            },
        ],
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: false,
            },
            splitLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            name: 'km/s minus 299,000',
            splitArea: {
                show: true,
            },
        },
        series: data.map((k) => {
            return { ...k };
        }),
    });
    return (
        <ReactEcharts
            option={getOption()}
            style={{
                height: size.height,
                width: size.width,
                margin: size.margin,
            }}
        />
    );
};

export default BoxPlot;
