import React, { ReactElement } from 'react';
import Curve from "../Curve";


export interface LineProps {
    positions: any;
}

/**
 * Leaflet Markers and Polyline for a single route path, corresponding to one host->dest pair
 */
function Line(props: LineProps): ReactElement {
    const {positions} = props;

    return (
        <Curve positions={positions} option={{color:'red',fill:true}}/>
    )
}

export default Line;
/*
function round(number: number, ndigits: number): number {
    // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    const factor = 10 ** ndigits;
    return Math.round((number + Number.EPSILON) * factor) / factor;
}*/
