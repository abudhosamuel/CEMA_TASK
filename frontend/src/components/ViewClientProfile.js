import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewClientProfile() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchClients() {
      const res = await axios.get('http://127.0.0.1:8000/clients');
      setClients(res.data);
    }
    fetchClients();
  }, []);

  const handleSearch = async () => {
    const client = clients.find(c => c.name === selectedClient);
    if (!client) {
      setError('❌ Client not found');
      setProfile(null);
      return;
    }

    try {
      const res = await axios.get(`http://127.0.0.1:8000/clients/${client.id}`);
      setProfile(res.data);
      setError('');
    } catch (err) {
      setProfile(null);
      setError('❌ Error fetching profile');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">View Client Profile</h2>
      <div className="mb-3">
        <label className="form-label">Select Client</label>
        <select className="form-select" value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
          <option value="">-- Choose Client --</option>
          {clients.map(client => (
            <option key={client.id} value={client.name}>{client.name}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>

      {error && <div className="alert alert-danger">{error}</div>}

      {profile && (
        <div className="card p-4 shadow-sm">
          <h4>Client Profile</h4>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Programs:</strong> {profile.programs.length > 0 ? profile.programs.join(", ") : "Not Enrolled"}</p>
        </div>
      )}
    </div>
  );
}

export default ViewClientProfile;
