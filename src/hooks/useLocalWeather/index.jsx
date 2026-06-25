import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useLocalWeather() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchByCoordinates(lat, lon) {
        try {
            setLoading(true);
            const response = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            if (data.results) {
                setWeather(data.results);
                setError(null);
            } else {
                setError("Não foi possível obter os dados do clima.");
            }
        } catch (err) {
            setError("Erro ao buscar dados do clima.");
            console.err(err);
        } finally {
            setLoading(false);
        }
    }

    async function fetchByCity(city) {
        try {
            setLoading(true);
            const response = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${city}`);
            const data = await response.json();
            if (data.results) {
                setWeather(data.results);
                setError(null);
            } else {
                setError("Cidade não encontrada.");
            }
        } catch (err) {
            setError("Erro ao buscar dados da cidade.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchByCoordinates(latitude, longitude);
                },
                (err) => {
                    setError("Permissão de localização negada.");
                    console.error(err.message);
                    setLoading(false);
                },
            );
        } else {
            setError("Geolocalização não suportada pelo navegador.");
            setLoading(false);
        }
    }, []);

    return { weather, error, loading, fetchByCity };
}
