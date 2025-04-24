import React, { useState } from 'react';
import axios from 'axios';

function SearchClient() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/clients/search/`, { params: { name: query } });
      setResults(res.data);
    } catch (err) {
      setResults([]);
      alert('Error searching clients');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Search Clients</h2>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter client name" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      <ul className="list-group">
        {results.map(client => (
          <li key={client.id} className="list-group-item">
            {client.name} (Age: {client.age}) — ID: {client.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchClient;
