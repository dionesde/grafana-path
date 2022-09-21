import React,{Component} from 'react';
import {DataFrame, PanelProps} from '@grafana/data';
import { SimpleOptions } from 'types';
import {Button} from '@grafana/ui';
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


export class SimplePanel extends Component<Props> {
  indexDate: number;
  constructor(props: Props) {
    super(props);
    this.indexDate = 0
  }
  componentDidUpdate(prevProps: Props): void {

  }
  processData( series: DataFrame[]): any{
    let entries = seriesToEntries(series);
    return entries;
  }
  loadDate(points: any[]): any[]{
    function isArray(points: any[], element: any): boolean{
      for(let i =0; i < points.length; i++){
        if(points[i] === element[4]){
          return true;
        }
      }
      return false;
    }
    const days: any[] = [];
    for(let i =0; i < points.length; i++){
      if(!isArray(days,points[i])){
        days.push(points[i][4]);
      }
    }
    return days;
  }
  getUrl(theme: any){
    return "https://{s}.basemaps.cartocdn.com/" + (theme ? "light" : "dark") + "_all/{z}/{x}/{y}.png";

  }
  render(){
    const { options, data, width, height } = this.props;
    const theme = false;
    const output = this.processData(data.series)
    const days = this.loadDate(output);

    return (
        <RLMap
            center={[options.lat, options.lng]}
            zoom={options.zoom}
            style={{ position: 'relative',height: height,width: width }}
            options={{ zoomSnap: 0.333, zoomDelta: 0.333 }}
        >
          <RoutePath points={output}></RoutePath>
          <TileLayer
              url= {this.getUrl(theme)}
              attribution='&copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
          />
          <Control position="bottomleft">
            <Legend points={output}/>
          </Control>
          <Control position="topright">
            <div className='map-overlay'>
              <label>{JSON.stringify(days)} {this.indexDate}</label>
              <input type='range'  step="1" min="0" max={days.length} onChange={e => {
                this.indexDate = Number(e.target.value);
              }
              } />
              <Button variant="primary" size="md" onClick={e => {
                alert('testeeeeeß' + this.indexDate)
                this.indexDate = this.indexDate + 1
              }} title="Fit the map view to all points">

                Fit
              </Button>
            </div>

          </Control>
          <Line positions={['M',[46.86019101567027,-29.047851562500004],
            'Q',[50.48547354578499,-23.818359375000004],
            [46.70973594407157,-19.907226562500004],
            'T',[46.6795944656402,-11.0302734375]]}  />
        </RLMap>
    );
  }

}


/*
export const SimplePanel: React.FC<Props> = ({ options, data, width, height },state) => {
  const theme = useTheme();
  const output = processData(data.series)
  const days = loadDate(output);

  return (
      <RLMap
        center={[options.lat, options.lng]}
        zoom={options.zoom}
        style={{ position: 'relative',height: height,width: width }}
        options={{ zoomSnap: 0.333, zoomDelta: 0.333 }}
    >
        <RoutePath points={output}></RoutePath>
      <TileLayer
          url= {getUrl(theme)}
          attribution='&copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
      />
        <Control position="bottomleft">
          <Legend points={processData(data.series)}/>
        </Control>
        <Control position="topright">
          <div className='map-overlay'>
            <label>{JSON.stringify(days)} {}</label>
            <input type='range'  step="1" min="0" max={days.length} onChange={e => {
              indexDate = e.target.value;
            }
            } />
            <Button variant="primary" size="md" onClick={e => {alert('testeeeeeß')}} title="Fit the map view to all points">

              Fit
            </Button>
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

function loadDate(points: any[]): any[]{
  function isArray(points: any[], element: any): boolean{
    for(let i =0; i < points.length; i++){
      if(points[i] === element[4]){
        return true;
      }
    }
    return false;
  }
  const days: any[] = [];
  for(let i =0; i < points.length; i++){
    if(!isArray(days,points[i])){
      days.push(points[i][4]);
    }
  }
  return days;
}

function processData( series: DataFrame[]): any{
  let entries = seriesToEntries(series);
  return entries;
}
*/
