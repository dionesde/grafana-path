import React, { ReactElement } from 'react';
import { CircleMarker} from "react-leaflet";

export interface RoutePathProps {
    points: [[number,number,string, string,string]];
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
                key={`${point[0]},${point[1]}`}
                color = {point[2]}
                //pathOptions={{ color: 'red' }}
                radius={radius ? radius : 2}>
            </CircleMarker>
            )
        )}
    </span>)
}

export default RoutePath;

