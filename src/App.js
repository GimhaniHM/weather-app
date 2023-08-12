
import './App.css';
import TopButton from './components/TopButton.jsx';
import Inputs from './components/Inputs.jsx';
import TimeAndLocation from './components/TimeAndLocation.jsx'
import TemperatureDetails from './components/TemperatureDetails.jsx'
import Forecast from './components/Forecast.jsx'

function App() {
  return (
  <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
    <TopButton />
    <Inputs />
    <TimeAndLocation />
    <TemperatureDetails />
    <Forecast title="hourly forecast" />
    <Forecast title="daily forecast" />
  </div>
    
  );
}

export default App;
