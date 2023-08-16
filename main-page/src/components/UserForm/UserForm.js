import React from 'react';
import './UserForm.css';

function UserForm({ user, onLogoutClick }) {
    return (
        <div className='form user-form'>
            <h1>Hello, {user.name}!</h1>
            <ul>
                <li><b>Login: </b>{user.login}</li>
                <li><b>Roles: </b>{user.roles}</li>
            </ul>
            <button
                className='logout-btn'
                onClick={() => onLogoutClick()}>
                logout
            </button>
        </div>
    );
}

export default UserForm;
