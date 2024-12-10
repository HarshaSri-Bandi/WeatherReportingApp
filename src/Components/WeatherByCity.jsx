import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

import '../Stylesheets/WeatherDetails.css';
import HourlyForecast from './HourlyForecast';
 import { useParams } from 'react-router-dom';


const WeatherByCity = () => {

  //const city = "London";
    const {city} = useParams();
    // const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

     // State to store the unit (true for Celsius, false for Fahrenheit)
    const [isCelsius, setIsCelsius] = useState(true);




    // const [weatherDataHour, setWeatherDataHour] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    //const [dateBeforeFiveDays, setDateBeforeFiveDays] = useState([])

    const [previousDates, setPreviousDates] = useState([]);


    const [error, setError] = useState('');

    const[loading , setLoading] = useState(false);
    
    const API_KEY = "b6f8ff277ffe45169ed114829240509";
    
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no.`;

    //const url2 = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=London&dt=${currentDate}.`;


        //    // Function to get the last 5 days' dates
        //    const getLastFiveDays = () => {
        //     const dates = [];
        //     const today = new Date();
    
    
        //     for (let i = 0; i < 5; i++) {
        //     const pastDate = new Date();
        //     pastDate.setDate(today.getDate() - i);
        //     const formattedDate = pastDate.toISOString().split('T')[0]; // "YYYY-MM-DD" format
        //     dates.push(formattedDate);
        //     }
    
    
        //     return dates;
        // };
    

    useEffect(() => {
        // Get current date
        const today = new Date();
    
    
        // Format current date as "YYYY-MM-DD"
        const formattedCurrentDate = today.toISOString().split('T')[0];
        setCurrentDate(formattedCurrentDate);
        
        // const datesArray = getLastFiveDays();
        // setPreviousDates(datesArray);

        if (city) {
        
            setWeatherData(null);
            //setWeatherDataHour(null);
  
            setLoading(true);
            fetchWeatherData();
            
            setLoading(true);
            //fetchWeatherDataHour();
            
            //console.log(currentDate);
            console.log(loading);
            
            //console.log(weatherDataHour);
  
            console.log(city);
            console.log(weatherData);
  
            
          }


       
      }, []);


      const toggleTemperatureUnit = () => {
        setIsCelsius(!isCelsius);
      };
    
    
      // Function to convert Celsius to Fahrenheit
      const convertToFahrenheit = (celsius) => {
        return (celsius * 9/5) + 32;
      };
    


    
    // Function to fetch weather data by city
  const fetchWeatherData = async() => {
    try {
      return await axios.get(url)
      .then((response) => setWeatherData(response.data))
      .then(setError(''));

      //console.log(weatherData);
    } catch (err) {
      setError('unable to find the city');
      setWeatherData(null);
    }finally{
        setLoading(false);
    }
  };

//   const fetchWeatherDataHour = async() => {
//     try {
//       return await axios.get(url2)
//       .then((response) => setWeatherDataHour(response.data))
//       .then(setError(''));

//       //console.log(weatherData);
//     } catch (err) {
//       setError('unable to find the city');
//       setWeatherDataHour(null);
//     }finally{
//         setLoading(false);
//     }
    
//   };

  
  
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
        
          setWeatherData(null);
          //setWeatherDataHour(null);

          setLoading(true);
          fetchWeatherData();
          
          setLoading(true);
          //fetchWeatherDataHour();
          
          //console.log(currentDate);
          console.log(loading);
          
          //console.log(weatherDataHour);

          console.log(city);
          console.log(weatherData);

          
        }

        console.log(previousDates);
      };
    

     
  
  return (
    <div className="weather-app">
    
   {/* Display loading spinner */}
   {loading && <p>Loading...</p>}

    {/* Display error message */}
    {error && <p style={{ color: 'red' }}>{error}</p>}

     {/* Display weather data */}

     
     {weatherData && !loading && (
     
    <div className='whether-data'>
    <div><span><h1><img src= {weatherData.current.condition.icon} className="Main-icon" />{weatherData.current.temp_c} °C</h1></span></div>
    <div className='location'><span >Weather in {weatherData.location.name}</span></div>
    
    </div>
     )}


<div class="weather-container">

{weatherData && !loading && (

<div class="current-weather">

<h1><span>{isCelsius 
        ? `${weatherData.current.temp_c} °C` 
        : `${convertToFahrenheit(weatherData.current.temp_c).toFixed(1)} °F`}</span>
      
    </h1>
    <label>
      <input 
        type="checkbox" 
        checked={isCelsius} 
        onChange={toggleTemperatureUnit}
      /> 
      Show in Celsius
    </label>

    <div className="weather-details">
    <h2>Current Weather Details</h2>
    <h2>
    <img src= {weatherData.current.condition.icon} className="icon" />
    <strong>{weatherData.current.condition.text}</strong>
  </h2>

    
      
    
     


    {/* <p> {weatherData.current.temp_c}</p> */}
    <div>UV Index : <span>{weatherData.current.uv}</span></div>
    <div>Humidity: <span>{weatherData.current.humidity}%</span></div>
    <div>Cloudy: <span>{weatherData.current.cloud}%</span></div>
    <div>Wind: <span>{weatherData.current.wind_kph}km/h</span></div>    
    </div>

    <HourlyForecast city = {city} currentDate = {currentDate}/>
    </div>
    )} 
    </div>
   

  </div>

  )
}

export default WeatherByCity;