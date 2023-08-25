//@ts-check
import React from 'react';
import './Navigator.css';

function Navigator({ selectedPage, pages, onPageClickHandler }) {
    const links = pages.map(page => {
        const postfix = page === selectedPage ? 'navigator-link-selected' : '';
        return (
            <div key={'navi-key-' + page}
                className={'navigator-link ' + postfix}
                onClick={() => { onPageClickHandler(page) }}>
                {page}
            </div>
        );
    });
    return (
        <div className='form navigator-form'>
            {links}
        </div>
    );
}

export default Navigator;
