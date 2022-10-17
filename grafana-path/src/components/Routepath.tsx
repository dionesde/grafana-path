import React, { ReactElement } from 'react';
import {CircleMarker} from "react-leaflet";
import {Point} from "../data";
import PointPopup from "./PointPopup";

export interface RoutePathProps {
    points: Point[];
    radius?: number;
    onclick?: any;
}

/**
 * Leaflet Markers and Polyline for a single route path, corresponding to one host->dest pair
 */
function RoutePath(props: RoutePathProps): ReactElement {
    const {points,radius,onclick} = props;

    return (<span>
        {points.map((point) => (
            <CircleMarker
                center={[point.lat,point.lng]}
                key={point.id}
                color = {point.color}
                onclick={() => {onclick(point)}}
                //pathOptions={{ color: 'red' }}
                radius={radius ? radius : 2}>
<PointPopup host={'<b>twkkawbv</b>'} dest={'jagsdhjgahjsgdja'} color={'#00ff55'}/>
            </CircleMarker>
            )
        )}
    </span>)
}

export default RoutePath;

