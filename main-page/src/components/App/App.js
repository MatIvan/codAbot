import React, { useState } from 'react';
import './App.css';

import LoginForm from '../LoginForm/LoginForm'
import UserForm from '../UserForm/UserForm'
import Navigator from '../Navigator/Navigator'

import AuthService from '../../services/AuthService';

function App() {
  const [user, setUser] = useState();
  AuthService.hooks.setUser = setUser;

  return (
    <div>
      <Navigator userRoles={user?.roles} />
      {user ? (
        <UserForm
          user={user}
          onLogoutClick={() => { AuthService.logout() }} />
      ) : (
        <LoginForm
          onLoginClick={(login, pass) => { AuthService.login(login, pass) }} />
      )}
    </div>
  );
}

export default App;
