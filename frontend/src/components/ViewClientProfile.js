import React, { useState } from 'react';
import axios from 'axios';

function ViewClientProfile() {
  const [clientId, setClientId] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/clients/${clientId}`);
      setProfile(res.data);
      setError('');
    } catch (err) {
      setProfile(null);
      setError('❌ Client Not Found.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">View Client Profile</h2>
      <div className="input-group mb-3">
        <input type="number" className="form-control" placeholder="Enter Client ID" value={clientId} onChange={(e) => setClientId(e.target.value)} />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {profile && (
        <div className="card p-4 shadow-sm">
          <h4>Client Info</h4>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Age:</b> {profile.age}</p>
          <p><b>Programs:</b> {profile.programs.length > 0 ? profile.programs.join(", ") : "Not Enrolled"}</p>
        </div>
      )}
    </div>
  );
}

export default ViewClientProfile;
