//@ts-check
import React from 'react';
import './AdminLog.css';

/**
 * @param {{logs: string[] | undefined}} props
 */
function AdminLog({ logs }) {
    const lines = logs?.map((str, index) => {
        return (<div key={'log-' + index} className='logline'>{str}</div>)
    });
    return (
        <div className='logbox'>
            {lines}
        </div>
    );
}

export default AdminLog;
