
import './App.css';
import TopButton from './components/TopButton.jsx';
import Inputs from './components/Inputs.jsx';
import TimeAndLocation from './components/TimeAndLocation.jsx'
import TemperatureDetails from './components/TemperatureDetails.jsx'
import Forecast from './components/Forecast.jsx'
//import getWeatherData from './services/WeatherService';
import getFormattedWeatherData from './services/WeatherService';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const message = query.q ? query.q : 'current location'

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then(
        (data) => {
          toast.success(`Successfully fetched for ${data.name}, ${data.country}.`);
          setWeather(data);
        }
      );

    };
    fetchWeatherData();

  }, [query, units]);

  const changeBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'

    const point = units === 'metric' ? 20 : 60;

    if (weather.temp <= point) return 'from-yellow-700 to-orange-700'

  }


  return (
    <div className="bg-cover bg-fixed bg-center h-screen" style={{ backgroundImage: "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg')" }}>
      <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${changeBackground()}`}>
        <TopButton setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureDetails weather={weather} />
            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )}

        <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />

      </div>
    </div>

  );
}

export default App;
