import React, { useState } from 'react';
import axios from 'axios';

function SearchClient() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/clients/search/`, {
        params: { name: query }
      });
      setResults(res.data);
    } catch (err) {
      alert('Error searching for clients');
    }
  };

  return (
    <div>
      <h2>Search Clients</h2>
      <input 
        type="text" 
        placeholder="Enter client name" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map(client => (
          <li key={client.id}>
            {client.name} (Age: {client.age}) - ID: {client.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchClient;
