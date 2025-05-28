import { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [city, setCity] = useState(() => {
    return localStorage.getItem('lastSearchedCity') || 'Korba';
  });

  const API_KEY = '5c4f87a04fc3f0cd7ec91a5689317abf';
  
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      }
      
      localStorage.setItem('lastSearchedCity', cityName);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchWeatherData(city);
    
    const interval = setInterval(() => {
      fetchWeatherData(city);
    }, 30000); 
    
    return () => clearInterval(interval);
  }, [city, unit]);

  const toggleUnit = () => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        error,
        loading,
        unit,
        city,
        fetchWeatherData,
        toggleUnit
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};