//@ts-check
import React, { useState } from 'react';
import './App.css';

import LoginForm from '../LoginForm/LoginForm'
import UserForm from '../UserForm/UserForm'
import Navigator from '../Navigator/Navigator'

import AuthService from '../../services/AuthService';
import HooksManager from '../../services/HooksManager';
import NavigatorService from '../../services/NavigatorService';

function App() {
  const [user, setUser] = useState(AuthService.getStrageUser());
  HooksManager.setHook('user', setUser);

  const [page, setPage] = useState('HOME');
  HooksManager.setHook('navigator.page', setPage);

  const pages = NavigatorService.getPages(user?.roles);

  return (
    <div>
      <Navigator
        selectedPage={page}
        pages={pages}
        onPageClickHandler={NavigatorService.onPage} />

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
