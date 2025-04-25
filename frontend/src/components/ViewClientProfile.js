import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function ViewClientProfile() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await axios.get(`${API_BASE_URL}/clients`);
        setClients(res.data);
      } catch (err) {
        setMessage('Failed to fetch clients.');
        setMessageType('danger');
      }
    }
    fetchClients();
  }, []);

  const handleViewProfile = async () => {
    const client = clients.find(c => c.name === selectedClient);
    if (!client) {
      setMessage('Please select a valid client.');
      setMessageType('danger');
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/clients/${client.id}`);
      setProfile(res.data);
      setMessage('');
    } catch (err) {
      setMessage('Failed to fetch client profile.');
      setMessageType('danger');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">View Client Profile</h2>
      {message && <div className={`alert alert-${messageType}`}>{message}</div>}
      <div className="card p-4 shadow-sm mb-4">
        <select className="form-select mb-3" value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
          <option value="">-- Select Client --</option>
          {clients.map(client => (
            <option key={client.id} value={client.name}>{client.name}</option>
          ))}
        </select>
        <button className="btn btn-primary w-100" onClick={handleViewProfile}>View Profile</button>
      </div>

      {profile && (
        <div className="card p-4 shadow-sm">
          <h4>{profile.name} (Age: {profile.age})</h4>
          <p><strong>Enrolled Programs:</strong></p>
          <ul>
            {profile.programs.length > 0 ? (
              profile.programs.map((prog, index) => <li key={index}>{prog}</li>)
            ) : (
              <li>No programs enrolled.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewClientProfile;
