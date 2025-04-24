import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterClient from './components/RegisterClient';
import CreateProgram from './components/CreateProgram';
import EnrollClient from './components/EnrollClient';
import ViewClientProfile from './components/ViewClientProfile';
import SearchClient from './components/SearchClient';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register Client</Link> | 
        <Link to="/program">Create Program</Link> | 
        <Link to="/enroll">Enroll Client</Link> | 
        <Link to="/view">View Profile</Link> |
        <Link to="/search">Search Client</Link> |
      </nav>
      <Routes>
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
