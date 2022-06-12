import React from 'react';
import s from './Graph.module.css';

const Graph = (props: any) => {
    return <div className={s.graph}>{props.child && props.child()}</div>;
};

export default Graph;
