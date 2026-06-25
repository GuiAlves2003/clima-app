import "./App.css";
import ForecastList from "./components/ForecastList";
import Loading from "./components/Loading";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { useLocalWeather } from "./hooks/useLocalWeather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
    const { weather, loading, error, fetchByCity } = useLocalWeather();

    return (
        <div className="app-container">
            <SearchBar onSearch={fetchByCity} />
            {loading ? (
                <Loading />
            ) : weather ? (
                <>
                    <h1>
                        {weather.city}{" "}
                        <span>
                            Nascer do Sol: {weather.sunrise} | Pôr do Sol: {weather.sunset}
                        </span>
                    </h1>
                    <WeatherCard weather={weather} />
                    <ForecastList forecasts={weather.forecast.slice(1, 4)} />
                </>
            ) : (
                <p>Digite uma cidade para buscar o clima.</p>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default App;
