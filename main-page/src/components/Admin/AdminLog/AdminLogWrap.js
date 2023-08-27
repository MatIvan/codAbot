//@ts-check
import React, { useState } from 'react';
import HooksManager from '../../../services/HooksManager';
import AdminLog from './AdminLog';

function AdminLogWrap() {
    const [logs, setLogs] = useState();
    HooksManager.setHook('admin.logs', setLogs);

    return (
        <AdminLog logs={logs} />
    );
}

export default AdminLogWrap;
