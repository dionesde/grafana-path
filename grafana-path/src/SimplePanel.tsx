import React from 'react';
import {DataFrame, PanelProps} from '@grafana/data';
import { SimpleOptions } from 'types';
import {useTheme } from '@grafana/ui';
import { Map as RLMap, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './painel.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import {seriesToEntries} from './data';
import RoutePath from "./components/Routepath";
import {Line} from "./components/line";
import Control from 'react-leaflet-control';
import Legend from "./components/Legend";
interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  return (
      <RLMap
        center={[options.lat, options.lng]}
        zoom={options.zoom}
        style={{ position: 'relative',height: height,width: width }}
        options={{ zoomSnap: 0.333, zoomDelta: 0.333 }}
    >
        <RoutePath points={processData(data.series)}></RoutePath>
      <TileLayer
          url= {getUrl(theme)}
          attribution='&copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
      />
        <Control position="bottomleft">
          <Legend points={processData(data.series)}/>
        </Control>
        <Control position="topright">
          <div className='map-overlay'>
            <label>teste</label>
            <input type='range' />
          </div>

        </Control>
        <Line positions={['M',[46.86019101567027,-29.047851562500004],
          'Q',[50.48547354578499,-23.818359375000004],
          [46.70973594407157,-19.907226562500004],
          'T',[46.6795944656402,-11.0302734375]]}  />
    </RLMap>
  );
};
function getUrl(theme: any){
  return "https://{s}.basemaps.cartocdn.com/" + (theme.isLight ? "light" : "dark") + "_all/{z}/{x}/{y}.png";

}



function processData( series: DataFrame[]): any{
  let entries = seriesToEntries(series);
  return entries;
}

