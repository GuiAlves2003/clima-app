import { useEffect, useState } from "react";
import "./App.css";
import ForecastList from "./components/ForecastList";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = "São José dos Campos, SP";

function App() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await fetch(`https://api.hgbrasil.com/weather?key=${API_KEY}&format=json-cors&city_name=${CITY}`);
                const data = await response.json();
                if (data.results) {
                    setWeather(data.results);
                    setForecast(data.results.forecast.slice(1, 4));
                }
            } catch (error) {
                console.error("Erro ao buscar dados da API: ", error);
            }
        }

        fetchWeather();
    }, []);

    return (
        <div className="app-container">
            <SearchBar />
            {weather && (
                <>
                    <h1>{weather.city}</h1>
                    <WeatherCard weather={weather} />
                    <ForecastList forecasts={forecast} />
                </>
            )}
        </div>
    );
}

export default App;
