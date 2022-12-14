import React,{Component} from 'react';
import {DataFrame, PanelProps} from '@grafana/data';
import { SimpleOptions } from 'types';
import { Map as RLMap, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './painel.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import {Point, seriesToEntries} from './data';
import RoutePath from "./components/Routepath";
import Control from 'react-leaflet-control';
import Legend from "./components/Legend";
import {Icon} from "@grafana/ui";
import LinePath from "./components/Linepath";

interface Props extends PanelProps<SimpleOptions> {}

interface State {
  indexDate: number;
  output: any[];
  days: any[];
  lView?: any;
  view?: any[];
  series: any;
  play: boolean
}

export class SimplePanel extends Component<Props, State> {
  output: any;
  time: any;

  constructor(props: Props) {
    super(props);
    const {data} = this.props;
    this.output = this.processData(data.series);
    const days = this.loadDate(this.output);
    const view = this.getDate(days[0]);
    this.state= {
      indexDate : 0,
      output: this.output,
      days,
      view,
      lView: [] as any,
      series: data.series,
      play: this.props.options.autoplay
    };
    this.animatioin();
  }

  animatioin(){
    if(this.state.play){
      let indexDate = this.state.indexDate;
      indexDate = (indexDate + 1) % this.state.days.length;
      const view = this.getDate(this.state.days[indexDate]);
      this.setState({indexDate,view, lView:[]});
    }
    this.time = setTimeout(()=>{this.animatioin()},this.props.options.delay);
  }

  componentDidUpdate(prevProps: Props): void {
    if(prevProps.data.series !== this.state.series){
      this.output = this.processData(prevProps.data.series);
      const days = this.loadDate(this.output);
      const view = days[this.state.indexDate] ? this.getDate(days[this.state.indexDate]) : this.getDate(days[0]);
      this.setState({view,days,output: this.output,series: prevProps.data.series, lView: []})
    }
  }
  processData( series: DataFrame[]): any{
    let entries = seriesToEntries(series);
    return entries;
  }
  getDate(date: string) {
    const points =  this.output;
    const view: any[] = [];
    for(let i =0; i < points.length; i++){
      if(points[i].day === date){
        view.push(points[i]);
      }
    }
    return view;
  }
  loadDate(points: any[]): any[]{
    function isArray(points: any[], element: any): boolean{
      for(let i =0; i < points.length; i++){
        if(points[i] === element.day){
          return true;
        }
      }
      return false;
    }
    const days: any[] = [];
    for(let i =0; i < points.length; i++){
      if(!isArray(days,points[i])){
        days.push(points[i].day);
      }
    }
    return days;
  }
  getUrl(theme: any){
    return "https://{s}.basemaps.cartocdn.com/" + (theme ? "light" : "dark") + "_all/{z}/{x}/{y}.png";
    //return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  }
  loadLine(point: Point){
    const output = [];
    for(let i = 0; i < point.from.length; i++){
      output.push({from: [point.lat,point.lng],to: [point.from[i].lat, point.from[i].lng], color: point.from[i].color});
    }
    this.setState({lView: output});
  }
  check_day(days: any[]): any{
    if(days.length > 0){
      return  <Control position="topright">
        <div className='map-overlay'>
          <span>{days[this.state.indexDate]}</span>
          <div>
            <input className="slider" type='range' defaultValue={0} step="1" min="0" max={days.length -1} onChange={e => {
              const indexDate = Number(e.target.value);
              const view = this.getDate(this.state.days[indexDate]);
              this.setState({indexDate, view, play: false, lView: []});
            }
            } />
            <Icon className="icon" onClick={()=>{this.setState({ play: !this.state.play});}} name={this.state.play ? 'pause' : 'play'} />
          </div>
        </div>

      </Control>
    }
  }
  render(){
    const { options, width, height } = this.props;
    const theme = true;
    const viewer = this.state.view as any;
    const lView  = this.state.lView as any[];
    const legend = this.state.output as any;
    const days = this.state.days;

    return (
        <RLMap
            center={[options.lat, options.lng]}
            zoom={options.zoom}
            style={{ position: 'relative',height: height,width: width }}
            options={{ zoomSnap: 0.333, zoomDelta: 0.333 }}
        >
          <RoutePath points={viewer} radius={this.props.options.radius} onclick={(point: any)=>{this.loadLine(point)}}></RoutePath>
          <LinePath points={lView}/>
          <TileLayer
              url= {this.getUrl(theme)}
              attribution='&copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
          />
          <Control position="bottomleft">
            <Legend points={legend}/>
          </Control>
          {this.check_day(days)}

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
            <Button variant="primary" size="md" onClick={e => {alert('testeeeee??')}} title="Fit the map view to all points">

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
