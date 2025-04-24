import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterClient from './components/RegisterClient';
import CreateProgram from './components/CreateProgram';
import EnrollClient from './components/EnrollClient';
import ViewClientProfile from './components/ViewClientProfile';
import SearchClient from './components/SearchClient';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
  <div className="container">
    <a className="navbar-brand" href="/">Health Information System</a>
    <div>
      <Link className="btn btn-outline-light mx-2" to="/register">Register Client</Link>
      <Link className="btn btn-outline-light mx-2" to="/program">Create Program</Link>
      <Link className="btn btn-outline-light mx-2" to="/enroll">Enroll Client</Link>
      <Link className="btn btn-outline-light mx-2" to="/view">View Profile</Link>
      <Link className="btn btn-outline-light mx-2" to="/search">Search Client</Link>
    </div>
  </div>
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
