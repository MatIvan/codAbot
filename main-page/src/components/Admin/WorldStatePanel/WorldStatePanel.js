//@ts-check
import React from 'react';
import './WorldStatePanel.css';

/**
 * @typedef {object} WorldState
 * @property  {'STOP' | 'START'} status
 * @property  {number} tick
 */

/**
 * @param {{worldState: WorldState | undefined}} props
 */
function WorldStatePanel({ worldState }) {
    return (
        <div>
            <div>status: {worldState ? worldState.status : '-'}</div>
            <div>tick: {worldState ? worldState.tick : '-'}</div>
        </div>
    );
}

export default WorldStatePanel;
