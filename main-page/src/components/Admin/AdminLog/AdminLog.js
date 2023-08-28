//@ts-check
import React, { useEffect } from 'react';
import './AdminLog.css';

let messagesEnd;

/**
 * @param {{logs: string[] | undefined}} props
 */
function AdminLog({ logs }) {
    useEffect(() => {
        messagesEnd?.scrollIntoView({ behavior: "smooth" });
    });

    const lines = logs?.map((str, index) => {
        return (<div key={'log-' + index} className='logline'>{str}</div>)
    });

    lines?.push(
        <div key='messagesEnd'
            style={{ float: "left", clear: "both" }}
            ref={(el) => { messagesEnd = el; }}>
        </div>)

    return (
        <div className='logbox'>
            {lines}
        </div>
    );
}

export default AdminLog;
