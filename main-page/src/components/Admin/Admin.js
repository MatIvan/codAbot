//@ts-check
import React, { useEffect, useState } from 'react';
import './Admin.css';
import HooksManager from '../../services/HooksManager';

function Admin() {
    const [gameStatus, setGameStatus] = useState();
    HooksManager.setHook('gameStatus', setGameStatus);

    useEffect(()=>{
        console.log('start updating');
        return ()=>{
            console.log('STOP updating');
        }
    })

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
