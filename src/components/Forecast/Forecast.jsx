import styles from './Forecast.module.css';

export const Forecast = ({ forecastData, unit }) => {
  if (!forecastData) return null;

  const dailyForecast = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    const hour = new Date(item.dt * 1000).getHours();
    
    if (!acc[date] || hour === 12) {
      acc[date] = item;
    }
    return acc;
  }, {});

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className={styles.forecastContainer}>
      <div className={styles.forecastHeader}>
        <h3 className={styles.forecastTitle}>5-Day Forecast</h3>
        <div className={styles.unitIndicator}>{temperatureUnit}</div>
      </div>
      
      <div className={styles.forecastDays}>
        {Object.entries(dailyForecast).slice(0, 5).map(([date, day]) => {
          const weekday = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
          const dayDate = new Date(day.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          
          return (
            <div key={date} className={styles.forecastDay}>
              <div className={styles.dayHeader}>
                <span className={styles.weekday}>{weekday}</span>
                <span className={styles.date}>{dayDate}</span>
              </div>
              
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                alt={day.weather[0].description}
                className={styles.weatherIcon}
              />
              
              <div className={styles.temperatures}>
                <span className={styles.highTemp}>
                  {Math.round(day.main.temp_max)}{temperatureUnit}
                </span>
                <span className={styles.lowTemp}>
                  {Math.round(day.main.temp_min)}{temperatureUnit}
                </span>
              </div>
              
              <div className={styles.weatherDetails}>
                <span className={styles.weatherDescription}>
                  {day.weather[0].description}
                </span>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Humidity:</span>
                  <span className={styles.detailValue}>{day.main.humidity}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};