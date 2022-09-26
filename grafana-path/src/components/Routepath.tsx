import React, { ReactElement } from 'react';
import { CircleMarker} from "react-leaflet";
import {Point} from "../data";

export interface RoutePathProps {
    points: Point[];
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
                center={[point.lat,point.lng]}
                key={point.id}
                color = {point.color}
                onclick={() => alert('teste' + point.label)}
                //pathOptions={{ color: 'red' }}
                radius={radius ? radius : 2}>
            </CircleMarker>
            )
        )}
    </span>)
}

export default RoutePath;

