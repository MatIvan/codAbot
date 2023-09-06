//@ts-check
import React, { useState } from 'react';
import './Home.css';
import TabSelector from './TabSelector/TabSelector';
import TabBot from './TabBot/TabBot';
import TabScript from './TabScript/TabScript';

/**
 * @param {string} tab
 */
function getTabContent(tab) {
    switch (tab) {
        case 'BOT':
            return (<TabBot />);
        case 'SCRIPT':
            return (<TabScript />);
    }
    return (<h1>Unknown tab :/</h1>);
}

function Home() {
    const [tab, setTab] = useState('BOT');

    return (
        <div className='form'>
            <TabSelector
                tab={tab}
                onTabClick={(newTab) => { setTab(newTab) }} />
            {getTabContent(tab)}
        </div>
    );
}

export default Home;
