import React, { ReactElement } from 'react';
import {Marker} from "react-leaflet";

export interface RoutePathProps {
    points: [number,number];
}

/**
 * Leaflet Markers and Polyline for a single route path, corresponding to one host->dest pair
 */
function RoutePath(props: RoutePathProps): ReactElement {
    const { points } = props;

    return (
                <Marker
                    position={points}
                >
                </Marker>
    );
}

export default RoutePath;
