import './App.css';
import { Input, InputLeftElement, InputGroup, ChakraProvider } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import React, {useState} from 'react'
import axios from 'axios'
import theme from './theme';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.weatherapi.com/v1/current.json?key=458655d7edcb415490172918230202&q=${location}&aqi=no`
  

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
      <div className='h-screen py-5'>
    <div  className='p-5 h-[100%] w-4/5 m-auto bg-slate-50/25 rounded-3xl flex justify-between items-center flex-col text-center' >
      <div className='' id = "top">
 <InputGroup >
    <InputLeftElement 
      pointerEvents='none'
      children={<SearchIcon color='black' width='15px' height='15px' />}/>
    <Input 
    type='text' 
    placeholder='Kyiv'
    _placeholder={{ color: 'rgba(0,0,0,0.3)', fontWeight: 'bold' }}
    onKeyPress={searchLocation}
    onChange={event => setLocation(event.target.value)}
    value={location}
    borderWidth="0"
    focusBorderColor='0'
    borderRadius='0'
    borderBottomWidth='2px'
    borderColor='black'/>
  </InputGroup>
  <div className='temp mt-24'>
  {data.current ? <h1 className='text-4xl font-bold'>{data.current.temp_c} °C</h1> : null}
  </div>
  <div className='time'>
  {data.location ? <p className='text-xl mt-1'>{data.location.localtime}</p> : null}
  </div>
  </div>
  {data.location!== undefined &&
  <div className = "flex flex-col justify-center items-center" id = "bottom">
    <div className='cloudness flex items-center'>
  {data.current ? <img src = {data.current.condition.icon} alt = "weather_ico" className='w-6'/> : null }
    {data.current.condition ? <p className='font-bold normal-case '>{data.current.condition.text}</p> : null}
    </div>
    <div className='Rainess flex'>
    <p className='font-bold'>🌧️Rain - </p>
    {data.current ? <p className='font-bold ml-1'>{data.current.humidity}%</p> : null}
    </div>
    <div className=' font-bold rounded-2xl p-5 mb-12 bg-slate-50/25 mt-2'>
    {data.location ? <h1>{data.location.name}, {data.location.country}</h1> : null}
    </div>
    {/* <div className='forecast bg-slate-50/25 h-36 overflow-x-scroll'>
      <div className='forecast_days flex'>
        <div className='forecast_day border-gray-200 border-2'>
        {data.forecast.forecastday[0].day.condition ? <img src = {data.forecast.forecastday.day.condition.icon} alt = "weather_ico" className='w-6'/> : null }
        {data.forecast.forecastday.hour ? <h1 className='font-bold'>{data.forecast.forecastday.hour.temp_c} °C</h1> : null}
        {data.forecast.forecastday ? <h1 className='font-bold'>{data.forecast.forecastday.date}</h1> : null} 
        </div>
      </div>
    </div> */}
  </div>
}
    </div>
    </div>
    </ChakraProvider>
  );
}

export default App;
