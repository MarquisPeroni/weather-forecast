import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import icons from "./data/icons.json"
import { useState, useEffect } from "react"
import Search from "./components/Search"
import CurrentWeather from "./components/CurrentWeather"
import NextDaysWeather from "./components/NextDaysWeather"

function App() {
  const [lon, setLon] = useState(-0.5);
  const [lat, setLat] = useState(50);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(position) {
      const coordinates = position.coords;
      setLat(coordinates.latitude);
      setLon(coordinates.longitude);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const getIcon = function (weather) {
    for (let i = 0; i < icons.weather.length; i++) {
      if (
        weather.toLowerCase() === 
        icons.weather_conditions[i].condition.toLowerCase()
      ) {
        return icons.weather_conditions[i].image_link;
      }
    }
  };

  console.log("Parent", lon, lat);

  return (
    <>
      <Search setLongitude={lon} setLatitude={lat} />
      <CurrentWeather
      longitude={lon}
      latitude={lat}
      getIcon={getIcon}
      windowWidth={windowWidth}
      />
      <NextDaysWeather
      longitude={lon}
      latitude={lat}
      getIcon={getIcon}
      windowWidth={windowWidth}
      setWindowWidth={setWindowWidth}
      />
    </>
  );
}

export default App;
