import React, { useState } from 'react'
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
    let api_key = "your api key";

    const [wicon,setWicon] = useState(Cloud);

    async function search()
    {
        const element=document.getElementsByClassName("cityInput");
        if(element[0].value==="")
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data=await response.json();

        const humidity=document.getElementsByClassName("humidity-percentage");
        const wind=document.getElementsByClassName("wind-rate");
        const temperature=document.getElementsByClassName("weather-temp");
        const location=document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = Math.floor(data.wind.speed)+"km/hr";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
            setWicon(Clear);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
        {
            setWicon(Cloud);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
        {
            setWicon(Drizzle);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
        {
            setWicon(Drizzle);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
        {
            setWicon(Rain);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
        {
            setWicon(Rain);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
        {
            setWicon(Snow);
        }
        else{
            setWicon(Clear);
        }

    }
  return (
    <div className='container'>
      <div className="top-bar">
      <input type='text' className='cityInput' placeholder='Search'/>
      <div className="search-icon" onClick={search}>
        <img src={Search} alt="" />
      </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt=''/>
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
            <img src={Humidity} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percentage">
                    64%
                </div>
                <div className="text">Humidity</div>
            </div>
        </div>


        <div className="element">
            <img src={Wind} alt="" className="icon" />
            <div className="data">
                <div className="wind-rate">
                    18 km/hr
                </div>
                <div className="text">Wind Speed</div>
            </div>
        </div>



      </div>
    </div>
  )
}

export default WeatherApp
