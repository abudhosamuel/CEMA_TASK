import React, { useState } from 'react';
import axios from 'axios';

function CreateProgram() {
  const [programName, setProgramName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/programs', null, { params: { name: programName } });
      setMessage('Program Created Successfully!');
      setProgramName('');
    } catch (err) {
      setMessage('Error creating program.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Create Health Program</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Program Name</label>
          <input type="text" className="form-control" value={programName} onChange={(e) => setProgramName(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Create Program</button>
      </form>
    </div>
  );
}

export default CreateProgram;
