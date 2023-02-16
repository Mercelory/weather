import './App.css';
import { Input, InputLeftElement,InputRightElement, InputGroup, ChakraProvider,Button } from '@chakra-ui/react';
import { TbMapPin,TbCloudRain,TbCloudFog } from "react-icons/tb";
import React, {useState} from 'react'
import axios from 'axios'
import SlideToggle from "react-slide-toggle";

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.weatherapi.com/v1/forecast.json?key=12cb6e8c6bea47269d695555230302&q=${location}&days=4&aqi=no&alerts=no`

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };  

  
  const searchLocation = (event) =>{
    
    if(event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data) 
      })
      setLocation('')
    }
  }

  return (
    <ChakraProvider>
      <div className='h-screen w-screen flex justify-center items-center md:bg-white'>
        <div className='md:h-4/5 md:w-2/4 bg-gradient-to-r from-blue-200 to-yellow-200 p-5 md:rounded-xl transition-all ease-in-out duration-1000 container flex flex-col h-screen w-screen overflow-auto'>
        <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<TbMapPin className='w-6 h-6 text-slate-600'/>}
    />
    <Input placeholder='Search a city' type = "text" 
onKeyPress={searchLocation}
onChange={event => setLocation(event.target.value)}
    value={location}
    border='none' className='justify-center items-center'/>
  </InputGroup>
  {data.location!== undefined && <>
  <div class="flex flex-col justify-center items-center transition-all ease-in-out duration-1000"> 
    {data.location ? <p className='text-4xl font-bold mt-6'>{(new Date(data.location.localtime)).toLocaleDateString("en-US",{ month: 'short', day: '2-digit', })}</p> : null}
    {data.current ? <img src={data.current.condition.icon} className='w-36' alt=''/> : null }
    {data.current ? <p className='text-6xl font-bold'>{data.current.temp_c} °C</p> : null }
    {data.current ? <p className=''>Feels like {data.current.feelslike_c} °C</p> : null }
    {data.location ? <h1 className='text-xl mb-8'>{data.location.name}, {data.location.country}</h1> : null}
  </div>
  <div className='flex justify-between'>
    <div className='flex items-center'>
      <div>
      <TbCloudFog className='w-8 h-8 mx-2'/>
      </div>
      <div>
  {data.current.condition ? <p>{data.current.condition.text}</p> : null}
  <p>Cloudness</p></div>
  </div>
  <div className='flex items-center'>
    <div>
    <TbCloudRain className='w-8 h-8 mx-2'/>
    </div>
    <div>
  {data.current ? <p> {data.current.humidity}%</p> : null}
  <p>Rain</p>
  </div>
  </div>
    </div>
    <div className=' flex overflow-scroll mt-8 snap-mandatory snap-x md:mt-0  md:overflow-visible h-fit'>
      <div className='forecast_days flex  w-3/7 md:w-full h-fit'>
        <div className='forecast_day border-gray-800/25 border-2 rounded-2xl p-3 flex flex-col items-center mt-2 mr-12 snap-center w-64 md:w-44'>
        {data.forecast.forecastday[1].day.condition ? <img src = {data.forecast.forecastday[1].day.condition.icon} alt = "weather_ico" className='w-12'/> : null }
        {data.forecast.forecastday[1].day.condition ? <h1 className='text-center'>{data.forecast.forecastday[1].day.condition.text}</h1> : null}
        {data.forecast.forecastday[1].day.condition ? <h1 className='text-center'>{data.forecast.forecastday[1].day.avgtemp_c}  °C</h1> : null}
        {data.forecast ? <h1>{(new Date(data.forecast.forecastday[1].date)).toLocaleDateString("en-US",{ month: 'short', day: '2-digit'})}</h1> : null}
        </div>
        <div className='forecast_day border-gray-800/25 border-2 rounded-2xl p-3 flex flex-col items-center  mt-2 mr-12 snap-center w-64 md:w-44'>
        {data.forecast.forecastday[2].day.condition ? <img src = {data.forecast.forecastday[2].day.condition.icon} alt = "weather_ico" className='w-12'/> : null }
        {data.forecast.forecastday[2].day.condition ? <h1 className='text-center'>{data.forecast.forecastday[2].day.condition.text}</h1> : null}
        {data.forecast.forecastday[2].day.condition ? <h1 className='text-center'>{data.forecast.forecastday[2].day.avgtemp_c}  °C</h1> : null}
        {data.forecast ? <h1>{(new Date(data.forecast.forecastday[2].date)).toLocaleDateString("en-US",{ month: 'short', day: '2-digit'})}</h1> : null}
        </div>
        <div className='forecast_day border-gray-800/25 border-2  rounded-2xl p-3 flex flex-col items-center  mt-2 snap-center w-64 md:w-44'>
        {data.forecast.forecastday[3].day.condition ? <img src = {data.forecast.forecastday[3].day.condition.icon} alt = "weather_ico" className='w-12'/> : null }
        {data.forecast.forecastday[3].day.condition ? <h1 className='text-center'>{data.forecast.forecastday[3].day.condition.text}</h1> : null}
        {data.forecast.forecastday[3].day.condition ? <h1 className='text-center'>{data.forecast.forecastday[3].day.avgtemp_c}  °C</h1> : null}
        {data.forecast ? <h1>{(new Date(data.forecast.forecastday[3].date)).toLocaleDateString("en-US",{ month: 'short', day: '2-digit'})}</h1> : null}
        </div>
    </div>
    </div>
    </>
}
</div>
      </div>
    </ChakraProvider>
  );
}
export default App;
