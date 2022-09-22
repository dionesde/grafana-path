import React, { ReactElement } from 'react';
import {Icon} from "@grafana/ui";

export interface RoutePathProps {
    points: [[number,number,string, string,string]];
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
                            <li key={point.label} className="host-item" >
                                <span className="host-arrow" style={{ color: point.color }}>
                                    <Icon name="circle" />
                                </span>
                                <span className="dest-label" title={point.label}>
                                    {point.label}
                                </span>
                            </li>
                        );
                    })}
                </ul>
    </div>)
}

export default Legend;

function loadData(points: any[]): any[]{
    function isArray(points: any[], element: any): boolean{
        for(let i =0; i < points.length; i++){
            if(points[i].label === element.label){
                return true;
            }
        }
        return false;
    }
    const legends: any[] = [];
    for(let i =0; i < points.length; i++){
        if(!isArray(legends,points[i])){
            legends.push(points[i])
        }
    }
    return legends;
}
