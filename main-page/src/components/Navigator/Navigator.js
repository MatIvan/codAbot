//@ts-check
import React from 'react';
import './Navigator.css';
import NavigatorService from '../../services/NavigatorService';

function Navigator({ roles, page }) {
    const pages = NavigatorService.getPages(roles);

    const links = pages.map(pageItem => {
        const postfix = pageItem === page ? 'navigator-link-selected' : '';
        return (
            <div key={'navi-key-' + pageItem}
                className={'navigator-link ' + postfix}
                onClick={() => { NavigatorService.onPage(pageItem) }}>
                {pageItem}
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
