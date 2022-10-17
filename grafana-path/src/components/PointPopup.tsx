/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import {Popup} from "react-leaflet";
import parse from 'html-react-parser';


export interface GenericPointPopupProps {
    description?: string;
}

export interface PointPopupProps extends GenericPointPopupProps {
    // host: string;
    // dest: string;
    // point: RoutePoint;
    // color: string;
    //showSearchIcon: boolean;
}



const PointPopup: React.FC<PointPopupProps> = ({ description }) => {
    return (
        <div>{check_pop(description)}</div>

    );
    function check_pop(description: any): any{
        if(description){
            return <Popup className="point-popup">
                { parse(description ? description : '') }
            </Popup>
        }
    }
};

export default PointPopup;
