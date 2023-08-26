//@ts-check
import React, { useState } from 'react';
import './Admin.css';
import HooksManager from '../../services/HooksManager';

function Admin({ page }) {
    const [gameStatus, setGameStatus] = useState();
    HooksManager.setHook('gameStatus', setGameStatus);

    // page === 'ADMIN'
    //     ? AdminService.startStatusUpdating()
    //     : AdminService.stopStatusUpdating();
    page === 'ADMIN'
        ? console.log('startStatusUpdating')
        : console.log('stopStatusUpdating');

    return (
        <div className='form'>
            ADMIN
            {/* <GameStatusPanel
                status={gameStatus} />
            <AdminApiPanel /> */}
        </div>
    );
}

export default Admin;
