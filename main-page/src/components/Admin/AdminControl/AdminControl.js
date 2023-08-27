//@ts-check
import React from 'react';
import './AdminControl.css';
import AdminService from '../../../services/AdminService';

function AdminControl() {
    return (
        <div className = "admin-control-ui">
            <button onClick={() => AdminService.start()}>start</button>
            <button onClick={() => AdminService.stop()}>stop</button>
        </div>
    );
}

export default AdminControl;
