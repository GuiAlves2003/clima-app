import { useEffect, useState } from "react";
import "./App.css";
import ForecastList from "./components/ForecastList";
import Loading from "./components/Loading";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            setLoading(true);
            try {
                const response = await fetch(`https://api.hgbrasil.com/weather?key=${API_KEY}&format=json-cors&city_name=${city}`);
                const data = await response.json();
                if (data.results) {
                    setWeather(data.results);
                    setForecast(data.results.forecast.slice(1, 4));
                }
            } catch (error) {
                console.error("Erro ao buscar dados da API: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, [city]);

    return (
        <div className="app-container">
            <SearchBar onSearch={setCity} />
            {loading ? (
                <Loading />
            ) : weather ? (
                <>
                    <h1>{weather.city}</h1>
                    <WeatherCard weather={weather} />
                    <ForecastList forecasts={forecast} />
                </>
            ) : (
                <p>Digite uma cidade para buscar o clima.</p>
            )}
        </div>
    );
}

export default App;
