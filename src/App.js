import './App.css';
import { Input, InputLeftElement, InputGroup, ChakraProvider } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import React, {useState} from 'react'
import axios from 'axios'
import theme from './theme';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e3e6399c3fdb2a9882f310b25528d95a&units=metric`

  const searchLocation = (event) =>{
    if(event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }

  return (
    <ChakraProvider theme = {theme}>
    <div  className='p-3 w-1/2 h-screen m-auto relative' >
      <div id = "top">
 <InputGroup >
    <InputLeftElement 
      pointerEvents='none'
      children={<SearchIcon color='black' width='15px' height='15px' />}/>
    <Input 
    type='text' 
    placeholder='Search for places'
    _placeholder={{ color: 'black', fontWeight: 'bold' }}
    onKeyPress={searchLocation}
    onChange={event => setLocation(event.target.value)}
    value={location}
    borderRadius="30px"
    borderWidth="0"/>
  </InputGroup>
  <div className='icon'>
 {data.weather ? <img src = {data.weather.icon}/> : null}
  </div>
  <div className='temp mt-12'>
  {data.main ? <h1 className='text-6xl font-bold'>{data.main.temp} °C</h1> : null}
  </div>
  <div className='time'>
    <p className='font-bold text-2xl'>{data.timezone}</p>
  </div>
  </div>
  {data.name !== undefined &&
  <div className = "absolute bottom-0 left-0"id = "bottom">
    <div className='cloudness'>
    {data.weather ? <p className='font-bold normal-case'>{data.weather[0].description}</p> : null}
    </div>
    <div className='Rainess flex'>
    <p className='font-bold'>Rain - </p>
    {data.main ? <p className='font-bold ml-1'>{data.main.humidity}%</p> : null}
    </div>
    <div className='font-bold border-2 rounded-2xl border-zinc-900 p-5 '>
    {data.sys ? <h1>{data.name}, {data.sys.country}</h1> : null}
    </div>
  </div>
}
    </div>
    </ChakraProvider>
  );
}

export default App;
