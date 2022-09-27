import React  from 'react';
import Curve from "../Curve";


export interface LineProps {
    to: number[],
    from: number[]
}

/**
 * Leaflet Markers and Polyline for a single route path, corresponding to one host->dest pair
 */
const Line: React.FC<LineProps> = (props: LineProps) => {
    const {from, to} = props;

    return (
        <Curve positions={['M',[from[0],from[1]],
            'T',[to[0],to[1]],'Z']} option={{dashArray: '5',animate: {duration: 20000, iterations: Infinity},color:'red'}}/>
    )
}
const SimpleSplineMemo = React.memo(Line);

export { SimpleSplineMemo as Line };

/*
function round(number: number, ndigits: number): number {
    // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    const factor = 10 ** ndigits;
    return Math.round((number + Number.EPSILON) * factor) / factor;
}*/
