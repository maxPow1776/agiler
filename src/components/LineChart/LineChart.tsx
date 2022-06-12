import React from 'react';
import ReactEcharts from 'echarts-for-react';

const createTrend = require('trendline');

type ChartData = {
    time: string;
    data: number;
}[];

type ChartSmooth = boolean;

type ChartProps = {
    data: ChartData;
    size?: { width: string; height: string; margin: string };
    smooth?: ChartSmooth;
    labelFormat?: string;
    withLine?: boolean;
    title?: string;
};

const getLineData = (data: ChartData) => {
    let result: any = [];

    const dataForTrendline = data.map((d, index) => {
        return {
            x: index,
            y: d.data,
        };
    });

    const trend = createTrend(dataForTrendline, 'x', 'y');
    if (data.length > 0) {
        result = [
            [
                {
                    coord: [data[0].time, trend.yStart < 0 ? 0 : trend.yStart],
                    symbol: 'none',
                },
                {
                    coord: [
                        data[data.length - 1].time,
                        trend.calcY(data.length - 1) >= 0
                            ? trend.calcY(data.length - 1)
                            : 0,
                    ],
                    symbol: 'none',
                },
            ],
        ];
    }

    return { data: result };
};

const getOption = (
    data: ChartData,
    smooth: ChartSmooth = false,
    labelFormat: string = '',
    withLine: boolean = false,
    title: string = ''
) => {
    return {
        title: {
            text: title,
        },
        xAxis: {
            type: 'category',
            data: data.map((d) => d.time),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: data.map((d) => d.data),
                type: 'line',
                smooth: smooth,
                label: {
                    show: true,
                    formatter: labelFormat ? labelFormat : '{c}',
                },
                markLine: withLine ? getLineData(data) : {},
            },
        ],
    };
};

const LineChart = ({
    data,
    smooth,
    labelFormat,
    withLine,
    title,
}: ChartProps) => {
    return (
        <ReactEcharts
            option={getOption(data, smooth, labelFormat!, withLine, title)}
            style={{ height: '100%', margin: '8px 16px' }}
        />
    );
};

export default LineChart;
