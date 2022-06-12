import React from 'react';
import ReactEcharts from 'echarts-for-react';

export type ChartTypeDate = Array<[number, number]>;

interface ChartProps {
    options: ChartTypeDate;
    size: { height: string; width: string; margin: string };
}

const getOption = (data: ChartTypeDate) => {
    return {
        tooltip: {
            trigger: 'axis',
            position: function (pt: any) {
                return [pt[0], '10%'];
            },
        },
        title: {
            left: 'center',
            text: 'Large Chart',
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
                restore: {},
                saveAsImage: {},
            },
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 20,
            },
            {
                start: 0,
                end: 20,
            },
        ],
        series: [
            {
                name: 'Data',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: data,
            },
        ],
    };
};

const LargeChart: React.FC<ChartProps> = ({ options, size }) => {
    return (
        <ReactEcharts
            option={getOption(options)}
            style={{
                minHeight: size.height,
                minWidth: size.width,
                margin: size.margin,
            }}
        />
    );
};

export default LargeChart;
