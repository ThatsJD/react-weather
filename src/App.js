import React,{useState} from 'react';
import './App.css';

function App() {

  const [query,setQuery]= useState('');
  const [weather,setWeather]= useState({});
  const api_key="1b3937bbf9df0eeeb58c6c502d4d31c7";
  const api_base="https://api.openweathermap.org/data/2.5/weather";
  const pritify_date=(d)=>{
    let result= new Intl.DateTimeFormat("en-GB",{
      year: "numeric",
      month: "long",
      day:"2-digit",
      weekday:"long"
    }).format(d).toString();
    return "" + result;
  };

  
const search=evt=>{
  if (evt.key === "Enter" ){
    console.log(api_base+'?q='+ query+'&units=metric&appid='+ api_key)
  fetch(api_base+'?q='+ query+'&units=metric&appid='+ api_key)
  .then(response => response.json())
  .then(result=> {
    setQuery('');
    setWeather(result);
  });
  }
};

  return (
    
    <div className={(typeof weather.main != 'undefined') ? ( (weather.main.temp < 15) ? ("App") : ("App warm-bg")) : ("App warm-bg")}>
      <main className="main">
      <div className="bg">
        <div className="search">
          <input className="searchbar" 
          type="search" 
          placeholder="Search..." 
          onChange={e=> setQuery(e.target.value)}
          value={query} 
          onKeyPress={search} />
        </div>
        { (typeof weather.main !='undefined') ? (
        <div className="content-box">
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{pritify_date(new Date())}</div>
          </div>
          <div className="weather-box">  
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </div>
      </main>
    </div>
  );
}

export default App;
