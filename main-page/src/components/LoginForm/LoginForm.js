import React, { useState } from 'react';
import './LoginForm.css';

async function loginUser(userData) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
}

function LoginForm({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmint = async e => {
        e.preventDefault();
        const token = await loginUser({
            login: username,
            password
        });
        setToken(token);
    }

    return (
        <form className='login-form' onSubmit={handleSubmint}>
            <label htmlFor="userName">Name</label>
            <input
                id="userName"
                type="text"
                onChange={e => setUserName(e.target.value)} />
            <label htmlFor="userPass">Password</label>
            <input
                id="userPass"
                type="text"
                onChange={e => setPassword(e.target.value)} />
            <button className='submit-btn' type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
