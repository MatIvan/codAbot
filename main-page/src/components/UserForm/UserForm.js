import React from 'react';
import './UserForm.css';

function UserForm({ user }) {

    const handleLogout = async e => {
        //TODO logout
        console.log('logout');
    }
    return (
        <div className='form user-form'>
            <h1>Hello, {user.name}!</h1>
            <ul>
                <li><b>Login: </b>{user.login}</li>
                <li><b>Roles: </b>{user.roles}</li>
            </ul>
            <button className='logout-btn' onClick={handleLogout}>
                logout
            </button>
        </div>
    );
}

export default UserForm;
