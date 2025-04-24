import React, { useState } from 'react';
import axios from 'axios';

function CreateProgram() {
  const [programName, setProgramName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/programs', null, {
        params: { name: programName }
      });
      alert('Program Created!');
      setProgramName('');
    } catch (err) {
      alert('Error creating program');
    }
  };

  return (
    <div>
      <h2>Create Health Program</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Program Name" value={programName} onChange={(e) => setProgramName(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProgram;
