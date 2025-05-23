import React,{useState} from 'react'
import { Suspense, lazy } from "react";
import './App.css'
const Data=lazy(()=>delayForDemo(import('./componets/data')))
const APIKEY='80850778ea356042ae6845c5013cd6df'
const APIURL='https://api.openweathermap.org/data/2.5/weather?q=city&appid=APIKEY&units=metric'
function App() {
  const [show, setShow] = useState(false);
  const [weatherinfo,setWeatherinfo]=useState({
    icon:"",
    city:"",
    temperature:"",
    humidity:"",
    wind_speed:""
  });
 const handlesubmit=(e)=>{
  e.preventDefault();
  const city=e.target[0].value; 
  if(city===""){
    alert("Please enter a city name");
    return;
  }
  fetchweather(city);
  setShow(true);

  };
  const onchanger=()=>{
    console.log("changed");
    setShow(false);   
  }
  const fetchweather=async(city)=>{
    const response=await fetch(APIURL.replace('city',city).replace('APIKEY',APIKEY));
    const data=await response.json();
    console.log(data);
    if(data.cod==="404"){
      alert("City not found");
      return;
    }
    if(data.cod==="400"){
      alert("Please enter a valid city name");
      return;
    }
    const iconMap = {
  Clear: "day.svg",
  Rain: "rainy-1.svg",
  Clouds: "cloudy-day-1.svg",
  Snow: "snowy.svg",
  Thunderstorm: "thunder.svg",
  Drizzle: "Drizzle.svg",
  Mist: "Mist.svg",
  Smoke: "Smoke.svg",
  Haze: "Haze.svg",
  Dust: "Dust.svg",
  Fog: "Fog.svg",
  Sand: "Sand.svg",
  Ash: "Ash.svg",
  Squall: "Squall.svg",
  Tornado: "Tornado.svg"
};

const weatherType = data.weather[0].main;
const iconFile = iconMap[weatherType] || "Default.svg";

    setWeatherinfo({
      ...weatherinfo,
      icon:'./src/assets/animated/' + iconFile,
      main:data.weather[0].main,
      city:data.name,
      temperature:data.main.temp,
      humidity:data.main.humidity,
      wind_speed:data.wind.speed
  })
  }
  return (
    <>
    <div className="App">
      <h1>Weather APP</h1>
      <form onSubmit={handlesubmit}>
        <label htmlFor="city">City: </label>
        <input type="text" id="city" name="city" onChange={onchanger}  placeholder="Enter city name" />
        <button type="submit">Search</button>
      </form>
      {show && (
      <Suspense className="suspense" 
				fallback={<div> loading please wait...</div>}
			>
				<Data {...weatherinfo} />
			</Suspense>
      )}
    </div>
    </>
  )
}

function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  }).then(() => promise);
}

export default App