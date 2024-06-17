// src/components/WeatherWidget.js

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './weather.css';  

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const widgetRef = useRef(null);
  const userLanguageRef = useRef('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          const locationResponse = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          userLanguageRef.current = locationResponse.data.address.country_code === 'br' ? 'pt_br' : 'pt';

          const apiKey = "01a325d15fef49b8784282bd739174d9";
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${userLanguageRef.current}`
          );
          setWeatherData(response.data.list.filter((_, index) => index % 8 === 0));

          if (widgetRef.current) {
            adjustWidgetHeight();
          }
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      adjustWidgetHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const adjustWidgetHeight = () => {
    if (widgetRef.current.clientHeight > 410) {
      widgetRef.current.style.height = "410px";
    } else {
      widgetRef.current.style.height = "auto";
    }
  };

  if (error) {
    return <div className="error-message">Falha ao carregar a meteorologia: {error}</div>;
  }

  if (weatherData.length === 0) {
    return <div className="loading">A carregar meteorologia...</div>;
  }

  return (
    <div className="weather-widget" ref={widgetRef}>
      <h2>Meteorologia para os próximos dias</h2>
      <div className="weather-content">
        {weatherData.map((data, index) => {
          const { main, weather, dt_txt } = data;
          const { temp, humidity } = main;
          const { description, icon } = weather[0];
          const date = new Date(dt_txt).toLocaleDateString(userLanguageRef.current === 'pt_br' ? 'pt-BR' : 'pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });

          return (
            <div key={index} className="weather-day">
              <h3>{date}</h3>
              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt="Ícone do Tempo"
              />
              <p>{description}</p>
              <p>Temperatura: {temp} °C</p>
              <p>Humidade: {humidity} %</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default WeatherWidget;
