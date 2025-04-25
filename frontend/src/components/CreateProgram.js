import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function CreateProgram() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/programs`, null, {
        params: { name }
      });
      setMessage('✅ Program created successfully!');
      setMessageType('success');
      setName('');
    } catch (err) {
      setMessage('❌ Failed to create program.');
      setMessageType('danger');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Create Health Program</h2>
      {message && <div className={`alert alert-${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <input type="text" className="form-control mb-3" placeholder="Program Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success w-100">Create Program</button>
      </form>
    </div>
  );
}

export default CreateProgram;
