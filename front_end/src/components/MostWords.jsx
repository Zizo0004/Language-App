import React, { useEffect, useState } from 'react';

const MostWords = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/most_words/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setWords(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }
  if (!Array.isArray(words)) {
    return <div style={{ color: 'red' }}>Unexpected data format from server.</div>;
  }

  return (
    <div>
      <h2>Most Popular Words</h2>
      <ul>
        {words.map((word, idx) => (
          <li key={idx}>{JSON.stringify(word)}</li>
        ))}
      </ul>
    </div>
  );
};

export default MostWords;