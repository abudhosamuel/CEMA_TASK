import React, { useState } from 'react';
import axios from 'axios';

function EnrollClient() {
  const [clientId, setClientId] = useState('');
  const [programId, setProgramId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/clients/${clientId}/enroll`, null, {
        params: { program_id: programId }
      });
      alert('Client Enrolled Successfully!');
      setClientId('');
      setProgramId('');
    } catch (err) {
      alert('Enrollment Failed');
    }
  };

  return (
    <div>
      <h2>Enroll Client in Program</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Client ID" value={clientId} onChange={(e) => setClientId(e.target.value)} required />
        <input type="number" placeholder="Program ID" value={programId} onChange={(e) => setProgramId(e.target.value)} required />
        <button type="submit">Enroll</button>
      </form>
    </div>
  );
}

export default EnrollClient;
