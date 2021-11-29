import React, { useState, useEffect } from 'react';

import { getMessage } from '../api';

// This is just a sample App component, replace it with your own.
const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // This is a sample of querying our API for a message
    getMessage()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
    </div>
  );
}

export default App;