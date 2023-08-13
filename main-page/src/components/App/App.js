import React, { useState } from 'react';
import './App.css';

import LoginForm from '../LoginForm/LoginForm'
import UserForm from '../UserForm/UserForm'
import Navigator from '../Navigator/Navigator'

import useToken from '../../hooks/useToken';

function parseJwt(tokenRaw) {
  if (!tokenRaw) {
    return null;
  }
  var base64Url = tokenRaw.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function App() {
  const { token, setToken } = useToken();
  const user = parseJwt(token)?.payload;

  const body = [];
  body.push(<Navigator userRoles={user?.roles} />);

  if (!token) {
    body.push(<LoginForm setToken={setToken} />);
  } else {
    body.push(<UserForm user={user} token={token} setToken={setToken} />);
  }

  return (
    <div>
      {body}
    </div>
  );
}

export default App;
