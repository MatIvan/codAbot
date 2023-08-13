import React from 'react';
import './Navigator.css';

const URL_MAIN = ['/', 'HOME', 10];
const URL_GAME = ['/game', 'GAME', 20];
const URL_ADMIN = ['/admin', 'ADMIN', 30];

const map = {
    game: { url: URL_GAME, roles: ['user', 'admin'] },
    admin: { url: URL_ADMIN, roles: ['admin'] },
    main: { url: URL_MAIN, roles: ['user', 'admin'] },
};

function contains(list, seachItem) {
    return list.findIndex(item => item === seachItem) >= 0;
}

function getUrls(userRoles) {
    if (!userRoles) {
        return [URL_MAIN];
    }

    const urls = [];
    userRoles.forEach(userRole => {
        Object.keys(map).forEach(key => {
            if (contains(map[key].roles, userRole)) {
                const url = map[key].url;
                if (!contains(urls, url)) {
                    urls.push(url);
                }
            }
        });
    });
    return urls;
}

function Navigator({ userRoles }) {
    const urls = getUrls(userRoles);
    if (urls.length > 1) {
        urls.sort((a, b) => { return a[2] - b[2] });
    }
    const links = [];
    urls.forEach(url => {
        links.push(
            <a className='navigator-link' href={url[0]}>{url[1]}</a>
        )
    });
    return (
        <div className='form navigator-form'>
            {links}
        </div>
    );
}

export default Navigator;
