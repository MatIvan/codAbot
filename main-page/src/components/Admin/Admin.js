//@ts-check
import React, { useEffect } from 'react';
import './Admin.css';
import AdminService from '../../services/AdminService';
import AdminControl from './AdminControl/AdminControl';
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
            <AdminControl />
            <AdminLogWrap />
        </div>
    );
}

export default Admin;
