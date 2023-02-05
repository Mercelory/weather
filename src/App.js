import './App.css';
import { Input, InputLeftElement, InputGroup, ChakraProvider } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import React, {useState} from 'react'
import axios from 'axios'
import theme from './theme';
import clsx from 'clsx';

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
      <div>
    <div className={clsx('p-5 w-screen m-auto bg-slate-900/25 flex justify-between items-center flex-col text-center',
                        'md:h-screen')} >
      <div className='' id = "top">
 <InputGroup >
    <InputLeftElement 
      pointerEvents='none'
      children={<SearchIcon color='rgb(208, 217, 224)' width='25px' height='25px' marginBottom='10px' />}/>
    <Input 
    type='text' 
    placeholder='Kyiv'
    _placeholder={{ color: 'rgb(208, 217, 224)', fontWeight: 'bold', fontSize: '30px',  padding: '15px', }}
    onKeyPress={searchLocation}
    onChange={event => setLocation(event.target.value)}
    value={location}
    borderWidth="0"
    focusBorderColor='rgb(208, 217, 224)'
    borderRadius='0'
    borderBottomWidth='2px'
    borderColor='rgb(208, 217, 224)'/>
  </InputGroup>
  <div className='temp mt-24'>
  {data.current ? <h1 className={clsx('desktop:text-8xl font-bold',
                                      'sm:text-5xl')}>{data.current.temp_c} °C</h1> : null}
  </div>
  <div className='time'>
  {data.location ? <p className={clsx('desktop:text-3xl mt-1',
                                      'sm:text-lg')}>{(new Date(data.location.localtime)).toLocaleDateString("en-US",{ month: 'short', day: '2-digit', })}</p> : null}
  </div>
  </div>
  {data.location!== undefined &&
  <div className = "flex flex-col justify-center items-center" id = "bottom">
    <div className='cloudness flex items-center'>
  {data.current ? <img src = {data.current.condition.icon} alt = "weather_ico" className={clsx('desktop:w-12', 'sm: w-8')}/> : null }
    {data.current.condition ? <p className={clsx('font-bold normal-case desktop:text-3xl','sm:text-lg')}>{data.current.condition.text}</p> : null}
    </div>
    <div className='Rainess flex'>
    <p className={clsx('font-bold normal-case desktop:text-3xl','sm:text-lg')}>🌧️ Rain - </p>
    {data.current ? <p className={clsx('font-bold normal-case desktop:text-3xl','sm:text-lg')}>{data.current.humidity}%</p> : null}
    </div>
    <div className={clsx('font-bold rounded-2xl p-5 mb-12 mt-2 desktop:text-3xl', 'sm:text-lg')}>
    {data.location ? <h1>{data.location.name}, {data.location.country}</h1> : null}
    </div>
    <div className='forecast'>
      <div className='forecast_days flex justify-evenly w-screen flex-wrap'>
        <div className='forecast_day border-gray-200 border-2 rounded-2xl p-3 flex flex-col items-center mt-2'>
        {data.forecast.forecastday[1].day.condition ? <img src = {data.forecast.forecastday[1].day.condition.icon} alt = "weather_ico" className='w-12'/> : null }
        {data.forecast.forecastday[1].day.condition ? <h1>{data.forecast.forecastday[1].day.condition.text}</h1> : null}
        {data.forecast.forecastday[1].day.condition ? <h1>{data.forecast.forecastday[1].day.avgtemp_c}  °C</h1> : null}
        {data.forecast ? <h1>{(new Date(data.forecast.forecastday[1].date)).toLocaleDateString("en-US",{ month: 'short', day: '2-digit'})}</h1> : null}
        </div>
        <div className='forecast_day border-gray-200 border-2 rounded-2xl p-3 flex flex-col items-center  mt-2'>
        {data.forecast.forecastday[2].day.condition ? <img src = {data.forecast.forecastday[2].day.condition.icon} alt = "weather_ico" className='w-12'/> : null }
        {data.forecast.forecastday[2].day.condition ? <h1>{data.forecast.forecastday[2].day.condition.text}</h1> : null}
        {data.forecast.forecastday[2].day.condition ? <h1>{data.forecast.forecastday[2].day.avgtemp_c}  °C</h1> : null}
        {data.forecast ? <h1>{(new Date(data.forecast.forecastday[2].date)).toLocaleDateString("en-US",{ month: 'short', day: '2-digit'})}</h1> : null}
        </div>
        <div className='forecast_day border-gray-200 border-2  rounded-2xl p-3 flex flex-col items-center  mt-2'>
        {data.forecast.forecastday[3].day.condition ? <img src = {data.forecast.forecastday[3].day.condition.icon} alt = "weather_ico" className='w-12'/> : null }
        {data.forecast.forecastday[3].day.condition ? <h1>{data.forecast.forecastday[3].day.condition.text}</h1> : null}
        {data.forecast.forecastday[3].day.condition ? <h1>{data.forecast.forecastday[3].day.avgtemp_c}  °C</h1> : null}
        {data.forecast ? <h1>{(new Date(data.forecast.forecastday[3].date)).toLocaleDateString("en-US",{ month: 'short', day: '2-digit'})}</h1> : null}
        </div>
      </div>
    </div> 
  </div>
}
    </div>
    </div>
    </ChakraProvider>
  );
}

export default App;
