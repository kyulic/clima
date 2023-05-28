import React, { useState } from 'react'
import getRandomElementFromArray from '../utils/randomElementFromArray'

const WeatherCard = ({weather,temp,arrBackground,setPathRandom}) => {

    const [isCelsius, setIsCelsius] = useState(true)

    const handleChangeTemp=()=> {
    setIsCelsius(!isCelsius)
    const newPath=getRandomElementFromArray(arrBackground)
    setPathRandom(newPath)
  }
  return (
    <article className='weather'> 
        <header className='weather_header'>
        <h1 className='weather_title'>Weather App</h1>
        <h2 className='weather_subtitle'>{weather?.name}, {weather?.sys.country}</h2>
        </header>
        <section className='weather_section'>
            <div className='weather_img'>
                <img src={weather? `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`:''} alt="" />
            </div>
                
            <div className='weather_paramether'>
            <h3 className=' weather_inf-title'>"{weather?.weather[0].description}"</h3>
                <ul className='weather_list'>
                    <li> Wind Speed: <span>{weather?.wind.speed} m/s </span> </li>
                    <li> Clouds:  <span> {weather?.clouds.all}% </span></li>
                    <li> Pressure:  <span> {weather?.main.pressure}hPa</span> </li>
                </ul>

            </div>
             </section>

             <footer className='weather_temp'>
                <h2 className='weather_c_f'>{isCelsius? `${temp?.celsius} °C` :`${temp?.farenheit} °F`}</h2>
                <button className='btn' onClick={handleChangeTemp}>Change to {isCelsius? '°F':' °C'}</button>
             </footer>

             <footer className='repositorio'>Karla Yulieth Caquimbo, <a href=' https://github.com/kyulic/clima'>Repositorio</a></footer>
        
       



    </article>
  )
}

export default WeatherCard