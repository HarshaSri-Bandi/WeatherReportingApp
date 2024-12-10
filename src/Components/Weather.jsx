import React from 'react'
import WeatherByCity from './WeatherByCity';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';



const Weather = () => {

    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city != null) {
          //Navigate to the /city/{cityName} route
          navigate(`/city/${city}`);
        }
      };
    

  return (
    <div>
        <form onSubmit={handleSubmit}>
        {/* <form > */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>

  
   {/* <WeatherByCity city = {city}/> */}

    </div>
  )
}

export default Weather;