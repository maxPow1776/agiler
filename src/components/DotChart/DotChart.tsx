/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import ReactEcharts from 'echarts-for-react';

type ChartData = { pointData: (string | number)[][]; dimensions: string[] };

type ChartProps = {
    data: ChartData;
    size: { height: string; width: string; margin: string };
};

function renderItem(
    params: echarts.CustomSeriesRenderItemParams,
    api: echarts.CustomSeriesRenderItemAPI
): echarts.CustomSeriesRenderItemReturn {
    const group: echarts.CustomSeriesRenderItemReturn = {
        type: 'group',
        children: [],
    };
    let coordDims = ['x', 'y'];

    for (let baseDimIdx = 0; baseDimIdx < 2; baseDimIdx++) {
        let otherDimIdx = 1 - baseDimIdx;
        let encode = params.encode;
        let baseValue = api.value(encode[coordDims[baseDimIdx]][0]);
        let param = [];
        param[baseDimIdx] = baseValue;
        param[otherDimIdx] = api.value(encode[coordDims[otherDimIdx]][1]);
        let highPoint = api.coord(param);
        param[otherDimIdx] = api.value(encode[coordDims[otherDimIdx]][2]);
        let lowPoint = api.coord(param);
        let halfWidth = 5;

        var style = api.style({
            stroke: api.visual('color') as string,
            fill: undefined,
        });

        group.children.push(
            {
                type: 'line',
                transition: ['shape'],
                shape: makeShape(
                    baseDimIdx,
                    highPoint[baseDimIdx] - halfWidth,
                    highPoint[otherDimIdx],
                    highPoint[baseDimIdx] + halfWidth,
                    highPoint[otherDimIdx]
                ),
                style: style,
            },
            {
                type: 'line',
                transition: ['shape'],
                shape: makeShape(
                    baseDimIdx,
                    highPoint[baseDimIdx],
                    highPoint[otherDimIdx],
                    lowPoint[baseDimIdx],
                    lowPoint[otherDimIdx]
                ),
                style: style,
            },
            {
                type: 'line',
                transition: ['shape'],
                shape: makeShape(
                    baseDimIdx,
                    lowPoint[baseDimIdx] - halfWidth,
                    lowPoint[otherDimIdx],
                    lowPoint[baseDimIdx] + halfWidth,
                    lowPoint[otherDimIdx]
                ),
                style: style,
            }
        );
    }

    function makeShape(
        baseDimIdx: number,
        base1: number,
        value1: number,
        base2: number,
        value2: number
    ) {
        var shape: Record<string, number> = {};
        shape[coordDims[baseDimIdx] + '1'] = base1;
        shape[coordDims[1 - baseDimIdx] + '1'] = value1;
        shape[coordDims[baseDimIdx] + '2'] = base2;
        shape[coordDims[1 - baseDimIdx] + '2'] = value2;
        return shape;
    }

    return group;
}

const getOption = (data: ChartData) => {
    return {
        tooltip: {},
        legend: {
            data: ['bar', 'error'],
        },
        dataZoom: [
            {
                type: 'slider',
            },
            {
                type: 'inside',
            },
        ],
        grid: {
            bottom: 80,
        },
        xAxis: {},
        yAxis: {},
        series: [
            {
                type: 'scatter',
                name: 'error',
                data: data.pointData,
                dimensions: data.dimensions,
                encode: {
                    x: 2,
                    y: 1,
                    tooltip: [2, 1, 3, 4, 5, 6],
                    itemName: 0,
                },
                itemStyle: {
                    color: '#77bef7',
                },
            },
            {
                type: 'custom',
                name: 'error',
                renderItem: renderItem,
                dimensions: data.dimensions,
                encode: {
                    x: [2, 3, 4],
                    y: [1, 5, 6],
                    tooltip: [2, 1, 3, 4, 5, 6],
                    itemName: 0,
                },
                data: data.pointData,
                z: 100,
            },
        ],
    };
};

const DotChart: React.FC<ChartProps> = ({ data, size }) => {
    return (
        <ReactEcharts
            option={getOption(data)}
            style={{
                height: size.height,
                width: size.width,
                margin: size.margin,
            }}
        />
    );
};

export default DotChart;
