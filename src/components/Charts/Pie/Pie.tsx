import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface PieProps {
    data: { value: number; name: string }[];
    size?: { height: string; width: string; margin: string };
}
const Pie: React.FC<PieProps> = ({ data }) => {
    const getOption = () => ({
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data,
            },
        ],
    });

    return (
        <ReactEcharts
            option={getOption()}
        />
    );
};

export default Pie;
