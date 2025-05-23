import React, { useState } from 'react';
import { executeQuery } from '../db';
import { useDatabaseContext } from '../DbContext';

function QueryView() {
  const [sqlInput, setSqlInput] = useState('SELECT * FROM patients;');
  const [results, setResults] = useState(null);

  const { isInitialized } = useDatabaseContext();

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-64">
        <h2>loading db...</h2>
      </div>
    );
  }

  const handleExecuteQuery = async () => {
    try {
      // sanitize the sql input to only allow select statements
      // check if sql statement starts with select skip case sensitivity
      if (!sqlInput.toLowerCase().trim().startsWith('select')) {
        alert ('Only select statements are allowed');
        return;
      }
      const result = await executeQuery(sqlInput);
      console.log(result);
      setResults(result);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  return (
    <div>
      <h2>Query Database</h2>
      <textarea
        value={sqlInput}
        onChange={(e) => setSqlInput(e.target.value)}
        rows={5}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleExecuteQuery}>Execute SQL</button>

      {results && results.success && (
        <div style={{ marginTop: '20px' }}>
          <h3>Results:</h3>
          {(
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>dob</th>
                  <th>address</th>
                  <th>phone</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {results.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{row.name}</td>
                    <td>{row.dob?.toLocaleDateString()}</td>
                    <td>{row.address}</td>
                    <td>{row.phone}</td>
                    <td>{row.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default QueryView; 