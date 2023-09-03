//@ts-check
import React, { useState } from 'react';
import './App.css';

import Navigator from '../Navigator/Navigator'
import UserPanel from '../UserPanel/UserPanel'
import AuthService from '../../services/AuthService';
import HooksManager from '../../services/HooksManager';
import NavigatorService from '../../services/NavigatorService';
import TopPanel from '../TopPanel/TopPanel';
import Content from '../Content/Content';

function App() {
  const [user, setUser] = useState(AuthService.getStorageUser());
  HooksManager.setHook('user', setUser);

  const [page, setPage] = useState('HOME');
  HooksManager.setHook('navigator.page', setPage);

  if (!user && page !== 'HOME') {
    NavigatorService.onPage('HOME');
  }

  return (
    <div className='body-grid'>
      <div className='body-grid-navigator'>
        <Navigator
          roles={user?.roles}
          page={page} />
      </div>
      <div className='body-grid-toppanel'>
        <TopPanel />
      </div>
      <div className='body-grid-user'>
        < UserPanel user={user} />
      </div>
      <div className='body-grid-content'>
        <Content page={page} />
      </div>
    </div>
  );
}

export default App;
