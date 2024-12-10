import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const HourlyForecast = ({city , currentDate}) => {

    const [weatherDataHour, setWeatherDataHour] = useState(null);
    const [weatherDataDays, setWeatherDataDays] = useState(null);
    // const [currentDate, setCurrentDate] = useState('');
    // const [dateBeforeFiveDays, setDateBeforeFiveDays] = useState('')
    
    const [previousWhetherData, setPeviousWhetherData] = useState( null);

    const [error, setError] = useState('');
    const[loading , setLoading] = useState(false);


    const API_KEY = "b6f8ff277ffe45169ed114829240509";
    
    const url2 = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${currentDate}.`;

    //const url3  = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}`;

    const url3 = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`


    
     useEffect(() => {
   
    console.log(currentDate);
        
        fetchWeatherDataHour();
        fetchWeatherDataDays();

        // console.log(previousDates);
        // console.log(`${url3}&dt=${previousDates[0]}`);
        console.log(previousWhetherData);
    }, []);

  
      const fetchWeatherDataHour = async() => {
        try {
          return await axios.get(url2)
          .then((response) => setWeatherDataHour(response.data))
          .then(setError(''));
    
          //console.log(weatherData);
        } catch (err) {
          setError('unable to find the city');
          setWeatherDataHour(null);

        }finally{
            setLoading(false);
        }
        
      };

    

      const fetchWeatherDataDays = async() => {
        // 
        try {
            return await axios.get(url3)
            .then((response) => setPeviousWhetherData(response.data))
            .then(setError(''));
      
           
          
        } catch (err) {
          setError('unable to find the city');
          setPeviousWhetherData(null);
        }finally{
            setLoading(false);
           
        }
        
      };

     

   
  return (
    <div>

        {!loading && weatherDataHour && ( 
        <div>     <hr />
        <div className='hourly-forecast' style={{ height: '70px', overflowY: 'scroll', border: '', padding: '10px' }}>
            <h3>Hourly Forecast</h3>
            {weatherDataHour.forecast.forecastday[0].hour.map((hour, index) => (

                <div class="hour">

                <span key={index}>
                <img src= {hour.condition.icon} className="icon" /> 
                <span>{index}:00</span>
                <span class="temp">{hour.temp_c}°C</span>
                {/* {hour.condition.text}   :  {hour.temp_c}°C */}
                </span>
                </div>
            ))}   
        </div>
    
        <hr />
        </div>
        
        )}
        

        <h3>5 Day Forecast</h3>


        {!loading && previousWhetherData &&(
            <div class="five-day-forecast">

            {previousWhetherData.forecast.forecastday.map((data, index) => (

                <div class="day">

                    <span key={index}>
                        <img src= {data.day.condition.icon} className="icon" /> 
                        <span>{ data.date}</span>
                        <span class="min-max"> Min : {data.day.mintemp_c}°C Max : {data.day.maxtemp_c}°C</span>

                       
                        {/* {data.day.condition.text} */}
    
                    </span>
                    </div>
                ))}
            </div>

        )}
    </div>
  )
}

export default HourlyForecast