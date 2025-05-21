import React, { useState } from 'react';

function QueryView() {
  const [sqlInput, setSqlInput] = useState('SELECT * FROM patients;');

  const handleExecuteQuery = () => {
    setCurrentQuery(sqlInput);
  };

  let results = null;

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

      {results && results.rows && (
        <div style={{ marginTop: '20px' }}>
          <h3>Results:</h3>
          {results.rows.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {results.fields.map((field) => (
                    <th key={field.name}>{field.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {results.fields.map((field) => (
                      <td key={field.name}>
                        {row[field.name] instanceof Date
                          ? row[field.name].toLocaleDateString()
                          : String(row[field.name])} 
                      </td>
                    ))}
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