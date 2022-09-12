type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  lat: number;
  lng: number;
  zoom: number;
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}
