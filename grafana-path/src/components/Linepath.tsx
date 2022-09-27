import React, { ReactElement } from 'react';
import {Line} from "./line";

export interface LinePathProps {
    points: any[];
}

/**
 * Leaflet Markers and Polyline for a single route path, corresponding to one host->dest pair
 */
function LinePath(props: LinePathProps): ReactElement {
    const {points} = props;

    return (<span>
        {points.map((point,key) => (
            <Line key = {key} from={[point.from[0], point.from[1]]}
                  to={[point.to[0],point.to[1]]}  />
            )
        )}
    </span>)
}

export default LinePath;

