import React, { useState } from 'react';
import './WeatherApp.css';
import Search from "../Assets/search.png";
import Clear from '../Assets/clear.png';
import Cloud from '../Assets/cloud.png';
import Drizzle from '../Assets/drizzle.png';
import Humidity from '../Assets/humidity.png';
import Rain from '../Assets/rain.png';
import Wind from '../Assets/wind.png';
import Snow from '../Assets/snow.png';

function WeatherApp() {
    const api_key = "f81a72650696f4a96b82427b275cc0a9";
    const [wicon, setWicon] = useState(Cloud);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [weatherData, setWeatherData] = useState({
        humidity: null,
        windSpeed: null,
        temperature: null,
        location: null
    });

    async function search() {
        if (searchTerm.trim() === "") {
            setError("Please enter a city name.");
            return;
        }
        setError(null);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            return;
        }

        // Update weather data
        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: Math.floor(data.wind.speed),
            temperature: Math.floor(data.main.temp),
            location: data.name
        });

        // Update weather icon
        const weatherCode = data.weather[0].icon;
        if (["01d", "01n"].includes(weatherCode)) {
            setWicon(Clear);
        } else if (["02d", "02n"].includes(weatherCode)) {
            setWicon(Cloud);
        } else if (["03d", "03n", "04d", "04n"].includes(weatherCode)) {
            setWicon(Drizzle);
        } else if (["09d", "09n", "10d", "10n"].includes(weatherCode)) {
            setWicon(Rain);
        } else if (["13d", "13n"].includes(weatherCode)) {
            setWicon(Snow);
        } else {
            setWicon(Cloud);
        }

        // Update search history
        if (!searchHistory.includes(searchTerm)) {
            setSearchHistory((prev) => [...prev, searchTerm]);
        }

        // Clear the input after the search
        setSearchTerm('');
    }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleHistoryItemClick = (term) => {
        setSearchTerm(term);
        search();
    };

    const handleClearHistory = () => {
        setSearchHistory([]);
    };

    // Filter search history
    const filteredHistory = searchHistory.filter(term =>
        term.toLowerCase().startsWith(searchTerm.toLowerCase()) && searchTerm.length >= 3
    );

    return (
        <div className='container'>
            <div className="top-bar">
                <input
                    type='text'
                    className='cityInput'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <div className="search-icon" onClick={search}>
                    <img src={Search} alt="Search" />
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Display filtered search history */}
            {searchTerm.length >= 3 && filteredHistory.length > 0 && (
                <div className="search-history">
                    {filteredHistory.map((term, index) => (
                        <div
                            key={index}
                            className="history-item"
                            onClick={() => handleHistoryItemClick(term)}
                        >
                            {term}
                        </div>
                    ))}
                </div>
            )}

            {searchTerm.length >= 3 && filteredHistory.length > 0 && (
                <div className="clear-history" onClick={handleClearHistory}>
                    Clear History
                </div>
            )}

            <div className="weather-image">
                <img src={wicon} alt='Weather Icon' />
            </div>
            <div className="weather-temp">{weatherData.temperature !== null ? `${weatherData.temperature}°C` : '--'}</div>
            <div className="weather-location">{weatherData.location || '--'}</div>
            <div className="data-container">
                <div className="element">
                    <img src={Humidity} alt="Humidity Icon" className="icon" />
                    <div className="data">
                        <div className="humidity-percentage">{weatherData.humidity !== null ? `${weatherData.humidity}%` : '--'}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={Wind} alt="Wind Icon" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.windSpeed !== null ? `${weatherData.windSpeed} km/hr` : '--'}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
