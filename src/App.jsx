import './App.css'
import Hero from './components/ui/custom/Hero';
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import Take_ai_help from './take-ai-help/take_ai_help.jsx';

function App() {
  return (
    <div className="bg-gradient-to-r from-[#ddb4f6] to-[#8dd0fc]">
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/view-trip/:tripId" element={<Viewtrip />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/take-ai-help" element={<Take_ai_help />} />
      </Routes>
    </div>
  );
}

export default App


