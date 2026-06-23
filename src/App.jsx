import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = "São José dos Campos, SP";

function App() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await fetch(`https://api.hgbrasil.com/weather?key=${API_KEY}&format=json-cors&city_name=${CITY}`);
                const data = await response.json();
                if (data.results) {
                    setWeather(data.results);
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
                </>
            )}
        </div>
    );
}

export default App;
