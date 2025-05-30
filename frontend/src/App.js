import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import RegisterClient from './components/RegisterClient';
import CreateProgram from './components/CreateProgram';
import EnrollClient from './components/EnrollClient';
import ViewClientProfile from './components/ViewClientProfile';
import SearchClient from './components/SearchClient';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <NavLink to="/" className="navbar-brand text-white">
            Health Information System
          </NavLink>
          <div>
            <NavLink 
              to="/register" 
              className={({ isActive }) => isActive ? "btn btn-light mx-2" : "btn btn-outline-light mx-2"}
            >
              Register Client
            </NavLink>

            <NavLink 
              to="/program" 
              className={({ isActive }) => isActive ? "btn btn-light mx-2" : "btn btn-outline-light mx-2"}
            >
              Create Program
            </NavLink>

            <NavLink 
              to="/enroll" 
              className={({ isActive }) => isActive ? "btn btn-light mx-2" : "btn btn-outline-light mx-2"}
            >
              Enroll Client
            </NavLink>

            <NavLink 
              to="/view" 
              className={({ isActive }) => isActive ? "btn btn-light mx-2" : "btn btn-outline-light mx-2"}
            >
              View Profile
            </NavLink>

            <NavLink 
              to="/search" 
              className={({ isActive }) => isActive ? "btn btn-light mx-2" : "btn btn-outline-light mx-2"}
            >
              Search Client
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterClient />} />
        <Route path="/program" element={<CreateProgram />} />
        <Route path="/enroll" element={<EnrollClient />} />
        <Route path="/view" element={<ViewClientProfile />} />
        <Route path="/search" element={<SearchClient />} />
      </Routes>
    </Router>
  );
}

export default App;
