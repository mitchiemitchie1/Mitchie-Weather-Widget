export interface WeatherData {
  temperature: string;
  realFeel: string;
  condition: string;
  location: string;
  description: string;
  isDay: boolean;
}

export interface GeoPosition {
  latitude: number;
  longitude: number;
}

export enum AppState {
  IDLE = 'IDLE',
  LOCATING = 'LOCATING',
  FETCHING_WEATHER = 'FETCHING_WEATHER',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}