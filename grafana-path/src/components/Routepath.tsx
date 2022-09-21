import React, { ReactElement } from 'react';
import { CircleMarker} from "react-leaflet";

export interface RoutePathProps {
    points: [[number,number,string, string]];
    radius?: number
}

/**
 * Leaflet Markers and Polyline for a single route path, corresponding to one host->dest pair
 */
function RoutePath(props: RoutePathProps): ReactElement {
    const {points,radius} = props;

    return (<span>
        {points.map((point) => (
            <CircleMarker
                center={[point[0],point[1]]}
                key={`${round(point[0], 1)},${round(point[1], 1)}`}
                color = {point[2]}
                //pathOptions={{ color: 'red' }}
                radius={radius ? radius : 2}>
            </CircleMarker>
            )
        )}
    </span>)
}

export default RoutePath;

function round(number: number, ndigits: number): number {
    // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    const factor = 10 ** ndigits;
    return Math.round((number + Number.EPSILON) * factor) / factor;
}
