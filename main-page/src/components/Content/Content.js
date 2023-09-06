//@ts-check
import React from 'react';
import './Content.css';

import Admin from '../Admin/Admin';
import Game from '../Game/Game';
import Home from '../Home/Home';

const pageComponents = {
  HOME: () => {
    return (<Home/>)
  },
  ADMIN: () => {
    return (<Admin />)
  },
  GAME: () => {
    return (<div className='form'><Game/></div>)
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
    getPage(page, { page })
  );
}

export default Content;
