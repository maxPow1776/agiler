import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DefectsPercentageRate from '../Widgets/DefectsPercentageRate';
import NetFlowPerWeek from '../Widgets/NetFlowPerWeek';
import PlannedVsUnplannedThroughputTrend from '../Widgets/PlannedVsUnplannedThroughputTrend';
import StartedVersusCompletedItemsPerWeek from '../Widgets/StartedVersusCompletedItemsPerWeek';
import ThroughputHistogram from '../Widgets/ThroughputHistogram';
import ThroughputHistoryTrend from '../Widgets/ThroughputHistoryTrend';
import TimeInProcessHistogram from '../Widgets/TimeInProcessHistogram';
import './GridStack.css';

const ResponsiveGridLayout = WidthProvider(Responsive);
const GridStack: React.FC = () => {
    const layout = {
        lg: [
            { i: 'a', x: 0, y: 0, w: 5, h: 3 },
            { i: 'b', x: 5, y: 0, w: 5, h: 3 },
            { i: 'c', x: 10, y: 0, w: 5, h: 3 },
            { i: 'd', x: 0, y: 1, w: 5, h: 3 },
            { i: 'f', x: 5, y: 1, w: 5, h: 3 },
            { i: 'g', x: 10, y: 1, w: 5, h: 3 },
            { i: 'm', x: 5, y: 2, w: 15, h: 4 },
        ],
    };
    return (
        <ResponsiveGridLayout
            className='layout'
            layouts={layout}
            breakpoints={{ lg: 1200, md: 1000, sm: 1008, xs: 480, xxs: 0 }}
            style={{ background: '#f0f2f5' }}
            cols={{ lg: 15, md: 15, sm: 5, xs: 5, xxs: 2 }}
            rowHeight={110}
            margin={[16, 16]}
            width={1500}
        >
            <div key='a' style={{ backgroundColor: 'white' }}>
                <DefectsPercentageRate />
            </div>
            <div key='b' style={{ backgroundColor: 'white' }}>
                <NetFlowPerWeek />
            </div>
            <div key='c' style={{ backgroundColor: 'white' }}>
                <PlannedVsUnplannedThroughputTrend />
            </div>
            <div key='d' style={{ backgroundColor: 'white' }}>
                <StartedVersusCompletedItemsPerWeek />
            </div>
            <div key='f' style={{ backgroundColor: 'white' }}>
                <ThroughputHistogram />
            </div>
            <div key='g' style={{ backgroundColor: 'white' }}>
                <ThroughputHistoryTrend />
            </div>
            <div key='m' style={{ backgroundColor: 'white' }}>
                <TimeInProcessHistogram />
            </div>
        </ResponsiveGridLayout>
    );
};

export default GridStack;
