//@ts-check
import React, { useState } from 'react';
import HooksManager from '../../../services/HooksManager';
import WorldStatePanel from './WorldStatePanel';
import AdminControl from '../AdminControl/AdminControl';

function WorldStateWrap() {
    const [worldState, setWorldState] = useState();
    HooksManager.setHook('admin.status', setWorldState);

    // @ts-ignore
    const status = worldState?.status;

    return (
        <div>
            <WorldStatePanel worldState={worldState} />
            <AdminControl worldStatus={status} />
        </div>
    );
}

export default WorldStateWrap;
