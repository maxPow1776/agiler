import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface BarProps {
    data: any[];
    size: { height: string; width: string; margin: string };
}

const Bar: React.FC<BarProps> = ({ data, size }) => {
    const getOption = () => ({
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: ['product', '2015', '2016', '2017'],
            source: data,
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
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

export default Bar;
