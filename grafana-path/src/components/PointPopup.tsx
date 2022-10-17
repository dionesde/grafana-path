/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import {Popup} from "react-leaflet";

export interface GenericPointPopupProps {
    host: string;
    dest: string;
    color: string;
}

export interface PointPopupProps extends GenericPointPopupProps {
    // host: string;
    // dest: string;
    // point: RoutePoint;
    // color: string;
    //showSearchIcon: boolean;
}

function htmlDecode(input: string): any{
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

const PointPopup: React.FC<PointPopupProps> = ({ host, dest }) => {
    return (
        <Popup className="point-popup">
            <div className="region-label">
                llll
            </div>
            <hr />
            <ul className="hop-list">
                <li className="hop-entry">
                    teste
                </li>
            </ul>
            <hr />
            <div className="host-dest-label">
        <div className="host-label" title={host} {...{__html: htmlDecode(host)}}>

        </div>
                <span className="host-arrow" >
          &nbsp; ➜ &nbsp;
        </span>
                <span className="dest-label" title={host}>
          {dest}
        </span>
            </div>
        </Popup>
    );
};

export default PointPopup;
