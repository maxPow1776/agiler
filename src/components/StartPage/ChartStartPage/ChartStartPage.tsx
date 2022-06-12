import React from 'react';
import ReactEcharts from 'echarts-for-react';

type ChartData = {
    time: string;
    data: number;
}[];

type ChartSmooth = boolean;

type ChartProps = {
    data: ChartData;
    smooth: ChartSmooth;
};

const getOption = (data: ChartData, smooth: ChartSmooth) => {
    return {
        xAxis: {
            type: 'category',
            data: data.map((d) => d.time),
            show: false,
        },
        yAxis: {
            type: 'value',
            axisLine: false,
        },
        gradientColor: ['#f6fa05', '#fa054e'],
        visualMap: [
            {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400,
            },
        ],
        animationDuration: 2000,
        series: [
            {
                data: data.map((d) => d.data),
                type: 'line',
                smooth: smooth,
                lineStyle: {
                    width: 5,
                },
                symbolSize: 7,
            },
        ],
    };
};

const Line = (props: ChartProps) => {
    return (
        <ReactEcharts
            option={getOption(props.data, props.smooth)}
            style={{ height: '500px', width: '700px', margin: 0 }}
        />
    );
};

export default Line;
