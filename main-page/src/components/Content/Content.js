//@ts-check
import React, { useState } from 'react';
import './Content.css';

import LoginForm from '../UserPanel/LoginForm/LoginForm'
import UserForm from '../UserPanel/UserForm/UserForm'
import Navigator from '../Navigator/Navigator'

import AuthService from '../../services/AuthService';
import HooksManager from '../../services/HooksManager';
import NavigatorService from '../../services/NavigatorService';
import Admin from '../Admin/Admin';
import TopPanel from '../TopPanel/TopPanel';

const pageComponents = {
  HOME: () => {
    return (<div className='form'>Wellcome!</div>)
  },
  ADMIN: ({ page }) => {
    return (<Admin
      page={page} />)
  },
  GAME: () => {
    return (<div className='form'>GAME</div>)
  },
}

function getPage(page, data) {
  if (typeof pageComponents[page] === 'function') {
    return pageComponents[page](data)
  }
  return (
    <div className='form'>ERROR</div>
  )
}

function Content({ page }) {

  return (
    <div className='body-grid'>
      {getPage(page, { page })}
    </div>
  );
}

export default Content;
