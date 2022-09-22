type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  lat: number;
  lng: number;
  zoom: number;
  text: string;
  delay: number;
  autoplay: boolean;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}

