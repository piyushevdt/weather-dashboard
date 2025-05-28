import { useWeather } from '../contexts/WeatherContext';

export const useWeatherData = () => {
  return useWeather();
};