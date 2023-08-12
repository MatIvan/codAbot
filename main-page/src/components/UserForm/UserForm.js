import React from 'react';
import './UserForm.css';

function logoutUser(token) {
    return fetch('/api/logout', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
}

function UserForm({ user, token, setToken }) {
    const handleLogout = e => {
        e.preventDefault();
        logoutUser(token);
        setToken(null);
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
