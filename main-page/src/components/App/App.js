import React, { useState } from 'react';
import './App.css';
import LoginForm from '../LoginForm/LoginForm'
import UserForm from '../UserForm/UserForm'
import useToken from '../../hooks/useToken';

function parseJwt(tokenRaw) {
  var base64Url = tokenRaw.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <LoginForm setToken={setToken} />
  }
  const user = parseJwt(token).payload;
  return (
    <div>
      <UserForm
        user={user}
        token={token}
        setToken={setToken} />
    </div>
  );
}

export default App;
