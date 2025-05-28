import { useWeather } from './contexts/WeatherContext';
import { SearchBar } from './components/SearchBar/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay/WeatherDisplay';
import { Forecast } from './components/Forecast/Forecast';
import { ErrorDisplay } from './components/ErrorDisplay/ErrorDisplay';
import styles from './App.module.css';

function App() {
  const {
    weatherData,
    forecastData,
    error,
    loading,
    unit,
    city,
    fetchWeatherData,
    toggleUnit
  } = useWeather();

  const handleSearch = (city) => {
    fetchWeatherData(city);
  };

  const handleRetry = () => {
    fetchWeatherData(city);
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Weather Dashboard</h1>
      <div className={styles.controls}>
        <SearchBar onSearch={handleSearch} />
        <button onClick={toggleUnit} className={styles.unitToggle}>
          Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>
      
      <ErrorDisplay error={error} onRetry={handleRetry} />
      
      {!error && (
        <>
          <WeatherDisplay weatherData={weatherData} unit={unit} loading={loading} />
          <Forecast forecastData={forecastData} unit={unit} />
        </>
      )}
    </div>
  );
}

export default App;