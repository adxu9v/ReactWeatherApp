import axios from "axios";
import React, {useEffect, useState} from "react"
function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [query,Setquery] = useState('');
  const [weather,Setweather] = useState('');
  const baseUrl = 'https://api.openweathermap.org/data/2.5/'
  const today = (a) => {
    let date = new Date()
    let Year = date.getFullYear()
    let month = (date.getMonth()+1)
    let day = (date.getDate()+a)
    return `${Year} . ${month} . ${day}` 
  }
  const weatherData = async (e) =>{
    if(e.key === 'Enter'){
    await  axios.get(`${baseUrl}weather?q=${query}&units=metric&appid=${apiKey}`)
      .then( result => { Setweather(result); })
      .catch(()=>{alert('Please Enter Detail ex)london, busan...');})
      Setquery('')
    }
 }
useEffect(() => { axios.get(`${baseUrl}weather?q=seoul&units=metric&appid=${apiKey}`)
.then( (res) => { Setweather(res)})
  },[apiKey])
    
   
  return (
    <div className={
    `App ${weather.data?.weather[0].main === 'Clouds' ? 'bg-cloud' 
    : weather.data?.weather[0].main === 'Rain' ? 'bg-rain'
    : weather.data?.weather[0].main === 'Mist' ? 'bg-fog'
    : weather.data?.weather[0].main === 'Drizzle' ? 'bg-rain'
    : weather.data?.weather[0].main === 'Clear' ? 'bg-sunny' 
    : 'bg-basic'}`
    }>
     <main>
     <div className="searchBox">
         <input type="text" value={query} onChange={e => Setquery(e.target.value)} className="searchBar" onKeyPress={weatherData} placeholder="ex)busan, london..."/>
          </div>
          <div className="informaitonBox">
          {weather.data ?
          <>
            <div className="locationBox">
              <div className="location">{weather.data.name}, {weather.data.sys.country}</div>
              <div className="date">{today(0)}</div>
            </div>
            <div className="weatherBox">
              <div className="temp">{weather.data.main.temp}℃</div>
              <div className="humidity">humidity : {weather.data.main.humidity} %</div>
              <div className="wind">wind : {weather.data.wind.speed} m/s, {weather.data.wind.deg} deg</div>
              {weather.data.rain ? <div className="rain">rain : {weather.data.rain['1h']} mm</div> : null}
        </div>
      </> : null}
       </div>
     </main>
    </div>
  );
}

export default App;