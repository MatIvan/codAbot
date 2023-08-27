//@ts-check
import React, { useState } from 'react';
import HooksManager from '../../../services/HooksManager';
import WorldStatePanel from './WorldStatePanel';

function WorldStateWrap() {
    const [worldState, setWorldState] = useState();
    HooksManager.setHook('admin.status', setWorldState);

    return (
        <WorldStatePanel worldState={worldState} />
    );
}

export default WorldStateWrap;
