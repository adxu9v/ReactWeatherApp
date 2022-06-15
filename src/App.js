import axios from "axios";
import React, {useState} from "react"
function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [query,Setquery] = useState('');
  const [weather,Setweather] = useState('');
  const today = () => {
    let date = new Date()
    let Year = date.getFullYear()
    let month = (date.getMonth()+1)
    let day = date.getDate()
    return `${Year} . ${month} . ${day}` 
  }
  const search = e =>{
    if(e.key === 'Enter'){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(result => {Setweather(result);}).catch(()=>{alert('Please Enter Detail ex)london, busan...');})
      Setquery('')
    }
  }
  return (
    <div className={`App ${weather.data?.weather[0].main == 'Clouds' ? 'bg-cloud' 
    : weather.data?.weather[0].main == 'Rain' ? 'bg-rain'
    : weather.data?.weather[0].main == 'Drizzle' ? 'bg-rain'
    : weather.data?.weather[0].main == 'Clear' ? 'bg-sunny' 
    : 'bg-basic'}`}>
     <main>
       <div className="searchBox">
         <input type="text" value={query} onChange={e => Setquery(e.target.value)} className="searchBar" onKeyPress={search} placeholder="ex)seoul"/>
        </div>
        {(typeof weather.data != 'undefined') ? (
          <div>
          <div className="locationBox">
       <div className="location">{weather.data.name}, {weather.data.sys.country}</div>
       <div className="date">{today(new Date())}</div>
     </div>
     <div className="weatherBox">
       <div className="temp">{weather.data.main.temp}℃</div>
       <div className="weather">weather : {weather.data.weather[0].main}</div>
       <div className="humidity">humidity : {weather.data.main.humidity} %</div>
       <div className="wind">wind : {weather.data.wind.speed} m/s, {weather.data.wind.deg} deg</div>
       {weather.data.rain ? <div className="rain">rain : {weather.data.rain['1h']} mm</div> : null}
     </div>
     </div>
        ) : ('')}
     </main>
    </div>
  );
}

export default App;
