import styles from './WeatherDisplay.module.css';

export const WeatherDisplay = ({ weatherData, unit, loading }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className={styles.noData}>
        <svg className={styles.noDataIcon} viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,14.4 5,16.5 6.7,18C8.1,16.7 10,16 12,16C14,16 15.8,16.7 17.3,18C19,16.5 20,14.4 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12C18,13.1 17.7,14.1 17.2,15.1C16.1,14.5 14.6,14 12,14C9.4,14 7.8,14.5 6.7,15.1C6.3,14.1 6,13.1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12C8,12.9 8.2,13.7 8.5,14.4C9.5,13.8 10.7,13.5 12,13.5C13.3,13.5 14.5,13.8 15.5,14.4C15.8,13.7 16,12.9 16,12A4,4 0 0,0 12,8Z" />
        </svg>
        <p>No weather data available</p>
        <p className={styles.noDataSubtext}>Try searching for a different location</p>
      </div>
    );
  }

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.weatherHeader}>
        <h2 className={styles.cityName}>
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <div className={styles.dateTime}>
          <span>{timeString}</span>
          <span>{dateString}</span>
        </div>
      </div>
      
      <div className={styles.weatherMain}>
        <div className={styles.weatherIcon}>
          <img 
            src={getWeatherIcon(weatherData.weather[0].icon)} 
            alt={weatherData.weather[0].description}
            className={styles.weatherImage}
          />
          <p className={styles.weatherDescription}>
            {weatherData.weather[0].description}
          </p>
        </div>
        
        <div className={styles.weatherDetails}>
          <div className={styles.temperatureContainer}>
            <p className={styles.temperature}>
              {Math.round(weatherData.main.temp)}
              <span className={styles.temperatureUnit}>{temperatureUnit}</span>
            </p>
            <div className={styles.temperatureRange}>
              <span>H: {Math.round(weatherData.main.temp_max)}{temperatureUnit}</span>
              <span>L: {Math.round(weatherData.main.temp_min)}{temperatureUnit}</span>
            </div>
          </div>
          
          <div className={styles.weatherStats}>
            <div className={styles.weatherStat}>
              <svg className={styles.statIcon} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z" />
              </svg>
              <div>
                <span className={styles.statLabel}>Humidity</span>
                <span className={styles.statValue}>{weatherData.main.humidity}%</span>
              </div>
            </div>
            
            <div className={styles.weatherStat}>
              <svg className={styles.statIcon} viewBox="0 0 24 24">
                <path fill="currentColor" d="M13,5.5C13,3.57 11.43,2 9.5,2C7.57,2 6,3.57 6,5.5C6,7.43 7.57,9 9.5,9C11.43,9 13,7.43 13,5.5M9.5,10C6.46,10 4,7.54 4,4.5C4,4 4,4 4,4.5C4,4 2,4 2,6V16C2,17.11 2.9,18 4,18H9.5C12.54,18 15,15.54 15,12.5C15,10.5 13.5,9 11.5,9C10.9,9 10.5,9.5 10.5,10H9.5M22,9V14C22,15.11 21.11,16 20,16H13V14H20V9H13V7H20C21.11,7 22,7.89 22,9Z" />
              </svg>
              <div>
                <span className={styles.statLabel}>Wind</span>
                <span className={styles.statValue}>{weatherData.wind.speed} {windSpeedUnit}</span>
              </div>
            </div>
            
            <div className={styles.weatherStat}>
              <svg className={styles.statIcon} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14.3,5.19 13.66,5 13,5A6,6 0 0,0 7,11C7,12.25 7.38,13.42 8,14.33L5.55,16.18L4.71,14.93C3.81,13.58 3.3,12 3.3,10.31C3.11,8.75 3.22,7.28 3.6,5.89C4.18,3.81 5.95,2.03 8.04,1.4C9.38,1.03 10.73,1 12,1M12,21C10.19,21 8.5,20.5 7.03,19.68L9.13,18.47C9.7,18.81 10.34,19 11,19A6,6 0 0,0 17,13C17,11.75 16.62,10.58 16,9.67L18.45,7.82L19.29,9.07C20.19,10.42 20.7,12 20.7,13.69C20.89,15.25 20.78,16.72 20.4,18.11C19.82,20.19 18.05,21.97 15.96,22.6C14.62,22.97 13.27,23 12,23V21Z" />
              </svg>
              <div>
                <span className={styles.statLabel}>Feels Like</span>
                <span className={styles.statValue}>{Math.round(weatherData.main.feels_like)}{temperatureUnit}</span>
              </div>
            </div>
            
            <div className={styles.weatherStat}>
              <svg className={styles.statIcon} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
              </svg>
              <div>
                <span className={styles.statLabel}>Pressure</span>
                <span className={styles.statValue}>{weatherData.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};