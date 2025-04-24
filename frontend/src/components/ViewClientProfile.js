import React, { useState } from 'react';
import axios from 'axios';

function ViewClientProfile() {
  const [clientId, setClientId] = useState('');
  const [profile, setProfile] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/clients/${clientId}`);
      setProfile(res.data);
    } catch (err) {
      alert('Client Not Found');
    }
  };

  return (
    <div>
      <h2>View Client Profile</h2>
      <input type="number" placeholder="Enter Client ID" value={clientId} onChange={(e) => setClientId(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {profile && (
        <div>
          <h3>Client Info</h3>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Age:</b> {profile.age}</p>
          <p><b>Programs:</b> {profile.programs.join(", ") || "None"}</p>
        </div>
      )}
    </div>
  );
}

export default ViewClientProfile;
