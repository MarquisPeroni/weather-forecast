import "./App.css"
import Search from "./components/search/Search"
import Forecast from "./components/forecast/Forecast"
import CurrentWeather from "./components/current-weather/CurrentWeather"
import { WEA_API_URL, WEA_API_KEY } from "./apiKey"
import { useState } from "react"

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEA_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEA_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEA_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEA_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-background">
      <main className="container">
        <h1>Thunderclouds today?</h1>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </main>
    </div>
  );
}

export default App;

//Ho riconfigurato completamente la mia applicazione, ieri ho avuto una giornata impraticabile e non sono riuscito a fare un bel lavoro,
// ho deciso oggi, di rifarlo completamente da zero. 
//spero non influisca troppo sul tuo feedback. ciao e buona giornata :)