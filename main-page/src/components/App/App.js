import React, { useState } from 'react';
import './App.css';

import LoginForm from '../LoginForm/LoginForm'
import UserForm from '../UserForm/UserForm'
import Navigator from '../Navigator/Navigator'

import AuthService from '../../services/AuthService';
import { hooks } from '../../services/HooksManager';

function App() {
  const [user, setUser] = useState(AuthService.getStrageUser());
  hooks.user = setUser;

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
