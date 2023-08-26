//@ts-check
import React, { useState } from 'react';
import './App.css';

import LoginForm from '../LoginForm/LoginForm'
import UserForm from '../UserForm/UserForm'
import Navigator from '../Navigator/Navigator'

import AuthService from '../../services/AuthService';
import HooksManager from '../../services/HooksManager';
import NavigatorService from '../../services/NavigatorService';
import Admin from '../Admin/Admin';
import TopPanel from '../TopPanel/TopPanel';

const pageComponents = {
  HOME: ({ user }) => {
    return (<div>Wellcome!</div>)
  },
  ADMIN: ({ page }) => {
    return (<Admin
      page={page} />)
  }
}

function getPage(page, data) {
  if (typeof pageComponents[page] === 'function') {
    return pageComponents[page](data)
  }
  return (
    <div className='form'>ERROR</div>
  )
}

function App() {
  const [user, setUser] = useState(AuthService.getStrageUser());
  HooksManager.setHook('user', setUser);

  const [page, setPage] = useState('HOME');
  HooksManager.setHook('navigator.page', setPage);

  const pages = NavigatorService.getPages(user?.roles);

  return (
    <div className='body-grid'>
      <div className='body-grid-navigator'>
        <Navigator
          selectedPage={page}
          pages={pages}
          onPageClickHandler={NavigatorService.onPage} />
      </div>
      <div className='body-grid-toppanel'>
        <TopPanel />
      </div>
      <div className='body-grid-user'>
        {user ? (
          < UserForm
            user={user}
            onLogoutClick={() => { AuthService.logout() }} />
        ) : (
          <LoginForm
            onLoginClick={(login, pass) => { AuthService.login(login, pass) }} />
        )}
      </div>
      <div className='body-grid-content'>
        {getPage(page, { user, page })}
      </div>
    </div>
  );
}

export default App;
