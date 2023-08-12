import React, { useState } from 'react';
import './App.css';
import LoginForm from '../LoginForm/LoginForm'

function App() {
  const [token, setToken] = useState();

  return (
    <div>
      <LoginForm
        setToken={setToken} />
    </div>
  );
}

export default App;
