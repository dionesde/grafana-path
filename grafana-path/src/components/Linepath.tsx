import React, { ReactElement } from 'react';
import {Point} from "../data";
import {Line} from "./line";

export interface LinePathProps {
    points: Point[];
}

/**
 * Leaflet Markers and Polyline for a single route path, corresponding to one host->dest pair
 */
function LinePath(props: LinePathProps): ReactElement {
    const {points} = props;

    return (<span>
        {points.map((point,key) => (
            <Line key = {key} from={[point.from[0].lat,point.from[0].lng]}
                  to={[point.lat,point.lng]}  />
            )
        )}
    </span>)
}

export default LinePath;

