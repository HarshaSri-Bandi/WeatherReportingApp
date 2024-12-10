import logo from './logo.svg';
import './App.css';
import Weather from './Components/Weather';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherByCity from './Components/WeatherByCity';

function App() {
  return (
    <div className="App">
      <div className="App-header">
       
  
        <Router>
          <Routes>
          
          <Route path ="/" element={<Weather/>} />
          <Route path ="/city/:city" element={<WeatherByCity />} /> {/* Route to display weather */}
          </Routes>
        </Router>

        </div>
    </div>
  );

}

export default App;
