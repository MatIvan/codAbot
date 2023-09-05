//@ts-check
import React from 'react';
import './AdminControl.css';
import AdminService from '../../../services/AdminService';
import UserService from '../../../services/UserService';
/**
 * @param {{worldStatus: 'START' | 'STOP' | undefined}} props
 */
function AdminControl({ worldStatus }) {
    return (
        <div className="admin-control-ui">
            <button disabled={worldStatus === 'START'} onClick={() => AdminService.start()}>start</button>
            <button disabled={worldStatus === 'STOP'} onClick={() => AdminService.stop()}>stop</button>
            <button onClick={() => UserService.getAll()}>getAllUsers</button>
        </div>
    );
}

export default AdminControl;
