import React, { useState } from 'react';
import axios from 'axios';

function EnrollClient() {
  const [clientId, setClientId] = useState('');
  const [programId, setProgramId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/clients/${clientId}/enroll`, null, { params: { program_id: programId } });
      setMessage(`Client ${clientId} enrolled in Program ${programId}`);
      setClientId('');
      setProgramId('');
    } catch (err) {
      setMessage('Enrollment Failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Enroll Client in Program</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Client ID</label>
          <input type="number" className="form-control" value={clientId} onChange={(e) => setClientId(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Program ID</label>
          <input type="number" className="form-control" value={programId} onChange={(e) => setProgramId(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Enroll Client</button>
      </form>
    </div>
  );
}

export default EnrollClient;
