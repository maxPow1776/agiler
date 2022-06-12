import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface SymbolicGraphProps {
    dataStories: number[];
    dataBugs: number[];
    time: string[];
    size?: { height: string; width: string; margin: string };
    title?: string;
}

const SymbolicGraph: React.FC<SymbolicGraphProps> = ({
    dataStories,
    dataBugs,
    size,
    title,
    time,
}) => {
    const getOption = () => ({
        title: {
            text: title,
        },
        xAxis: {
            type: 'category',
            data: time.map((d) => d),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: dataBugs,
                type: 'line',
                symbol: 'triangle',
                symbolSize: 10,
                lineStyle: {
                    color: 'transparent',
                    width: 4,
                    type: 'dashed',
                },
                itemStyle: {
                    color: 'grey',
                },
            },
            {
                data: dataStories,
                type: 'line',
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    color: 'transparent',
                    width: 4,
                    type: 'dashed',
                },
                itemStyle: {
                    color: 'orange',
                },
            },
        ],
    });
    return (
        <ReactEcharts
            option={getOption()}
            style={
                size
                    ? { ...size }
                    : { height: '210px', width: '420px', margin: 'auto' }
            }
        />
    );
};

export default SymbolicGraph;
