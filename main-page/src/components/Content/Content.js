//@ts-check
import React from 'react';
import './Content.css';

import Admin from '../Admin/Admin';

const pageComponents = {
  HOME: () => {
    return (<div className='form'>Wellcome!</div>)
  },
  ADMIN: ({ page }) => {
    return (<Admin />)
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
    <div>
      {getPage(page, { page })}
    </div>
  );
}

export default Content;
