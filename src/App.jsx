
import { useEffect, useState } from 'react'
import './App.css'
import getApiKey from './utils/getApiKey'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'
import './components/styles/weatherCard.css'
import randomElementFromArray from './utils/randomElementFromArray'

const arrBackground=[1,2,3]
function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const initalPhath=randomElementFromArray(arrBackground)
  const [pathRandom,setPathRandom]=useState(initalPhath)
  const objStyle={
    
    backgroundImage: `url('../fondo${pathRandom}.jpg')`
  }

  
  useEffect(()=>{
    
    const success=pos=>{
      // console.log(pos)
      const obj={
        lat:pos.coords.latitude,
        log:pos.coords.longitude
  
      }
      setCoords(obj)
    }
    navigator.geolocation.getCurrentPosition(success)

  },[])
   
  
   useEffect(()=>{
    setIsLoading(false)
    if(coords){
      const url=`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.log}&appid=${getApiKey()}`
      
      axios.get(url)
      //es lo que se ejecuta cuando llega la petición 
      .then(res=>{
        setWeather(res.data)
        const objTemp={
          //toFixed() nos pone decimales en este caso 1
        celsius:+(res.data.main.temp-273.15).toFixed(1),
        farenheit:+ ((res.data.main.temp-273.15)*(9/5)+32).toFixed(1)

        }
        setTemp(objTemp)
      
      })
      .catch(err=>console.log(err))
      .finally(()=>setIsLoading(true))
    }
    
    
   },[coords])
   
  //  console.log(temp)
  //  console.log(weather)
   

  return (
    <div style={objStyle} className='app'>
      {
        isLoading      
        ?
        <WeatherCard 
        weather={weather}
        temp={temp}
        arrBackground={arrBackground}
        setPathRandom={setPathRandom}

        />
        :<Loading/>
      }
      


    </div>
  )
}

export default App
