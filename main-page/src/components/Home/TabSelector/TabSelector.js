//@ts-check
import React from 'react';
import './TabSelector.css';

const tabs = [
    ['BOT', 'Bots'],
    ['SCRIPT', 'Scripts']
]

function TabSelector({ tab, onTabClick }) {
    const links = tabs.map(tabItem => {
        const [name, caption] = tabItem;
        const postfix = name === tab ? 'navigator-link-selected' : '';
        return (
            <div key={'tab-key-' + name}
                className={'navigator-link ' + postfix}
                onClick={() => { onTabClick(name); }}>
                {caption}
            </div>
        );
    });

    return (
        <div className='form navigator-form'>
            {links}
        </div>
    );
}

export default TabSelector;
