import React, { ReactElement } from 'react';
import {Icon} from "@grafana/ui";

export interface RoutePathProps {
    points: [[number,number,string, string]];
}

/**
 * Leaflet Markers and Polyline for a single route path, corresponding to one host->dest pair
 */
function Legend(props: RoutePathProps): ReactElement {
    const {points} = props;
    const legends: any[] = loadData(points);
    return ( <div className="host-tray">
                <ul className="host-list">
                    {legends.map((point) => {
                        return (
                            <li key={`${round(point.lat, 1)},${round(point.lng, 1)}`} className="host-item" >
                                <span className="host-arrow" style={{ color: point.color }}>
                                    <Icon name="arrow-right" />
                                </span>
                                <span className="dest-label" title={point.label}>
                                    {point.label} hhhh
                                </span>
                            </li>
                        );
                    })}
                </ul>
        )
    </div>)
}

export default Legend;

function round(number: number, ndigits: number): number {
    // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    const factor = 10 ** ndigits;
    return Math.round((number + Number.EPSILON) * factor) / factor;
}
function loadData(points: any[]): any[]{
    function isArray(points: any[], element: any): boolean{
        for(let i =0; i < points.length; i++){
            if(points[i].label === element[3]){
                return true;
            }
        }
        return false;
    }
    const legends: any[] = [];
    for(let i =0; i < points.length; i++){
        if(!isArray(legends,points[i])){
            legends.push({lat:points[0],lng:points[1],label:points[i][3], color: points[i][2]})
        }
    }
    return legends;
}
