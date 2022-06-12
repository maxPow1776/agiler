import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface StackedLineProps {
    data: {
        name: string;
        data: number[];
    }[];
    time: string[];
    title?: string;
}

const StackedLine: React.FC<StackedLineProps> = ({ data, title, time }) => {
    const getOption = () => ({
        title: {
            text: title,
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: time.map((d) => d),
        },
        yAxis: {
            type: 'value',
        },
        series: data.map((d) => {
            return {
                ...d,
                type: 'line',
                stack: 'Total',
            };
        }),
    });

    return (
        <ReactEcharts
            option={getOption()}
            style={{ height: '100%', margin: '8px 16px' }}
        />
    );
};

export default StackedLine;
