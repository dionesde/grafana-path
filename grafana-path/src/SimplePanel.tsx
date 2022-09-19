import React from 'react';
import {DataFrame, PanelProps} from '@grafana/data';
import { SimpleOptions } from 'types';
import { css} from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import { Map as RLMap, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import {seriesToEntries} from './data';
import RoutePath from "./components/Routepath";
import {Line} from "./components/line";
interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();
  return (
    <div
 /*     className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}*/
    > <div className={styles.textBox}>
      {options.showSeriesCount && (
          <div
              className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
            `}
          >
            Number of series: {data.series.length}
          </div>
      )}
    </div>
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
        <Line positions={['M',[50.14874640066278,14.106445312500002],
          'Q',[51.67255514839676,16.303710937500004],
          [50.14874640066278,18.676757812500004],
          'T',[49.866316729538674,25.0927734375]]}  />
    </RLMap>


    </div>
  );
};
function getUrl(theme: any){
  return "https://{s}.basemaps.cartocdn.com/" + (theme.isLight ? "light" : "dark") + "_all/{z}/{x}/{y}.png";

}



function processData( series: DataFrame[]): any{
  let entries = seriesToEntries(series);
  return entries;
}

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: relative;
      top: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
