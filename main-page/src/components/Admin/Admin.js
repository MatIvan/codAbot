//@ts-check
import React, { useEffect } from 'react';
import './Admin.css';
import AdminService from '../../services/AdminService';
import AdminLogWrap from './AdminLog/AdminLogWrap';
import WorldStateWrap from './WorldStatePanel/WorldStateWrap';

function Admin() {

    useEffect(() => {
        AdminService.updatingStart();
        return () => {
            AdminService.updatingStop();
        }
    })

    return (
        <div className='form'>
            <WorldStateWrap />
            <AdminLogWrap />
        </div>
    );
}

export default Admin;
