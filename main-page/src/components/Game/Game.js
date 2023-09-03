//@ts-check
import React, { useEffect } from 'react';
import './Game.css';
import GameService from '../../services/GameService';
import Field from './Field/Field';

function Game() {

    useEffect(() => {
        GameService.updatingStart();
        return () => {
            GameService.updatingStop();
        }
    })

    return (
        <div className='gamebox'>
            <Field />
        </div>
    );
}

export default Game;
