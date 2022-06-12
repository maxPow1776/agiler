import React from 'react';
import ReactEcharts from 'echarts-for-react';

type BarData = {
    title: string;
    labels: string[];
    values: number[][];
};

interface BarProps {
    data: BarData;
    size?: { height: string; width: string; margin: string };
}

const getOption = (data: BarData) => {
    const series: {
        data: number[];
        type: string;
    }[] = [];
    data.values!.forEach((d) =>
        series.push({
            data: d,
            type: 'bar',
        })
    );
    return {
        title: {
            text: data.title,
        },
        xAxis: {
            type: 'category',
            data: data.labels,
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
        },
        series,
    };
};

const Bar: React.FC<BarProps> = ({ data }) => {
    return (
        <ReactEcharts
            option={getOption(data)}
            style={{ height: '100%', margin: '8px 16px' }}
        />
    );
};

export default Bar;
