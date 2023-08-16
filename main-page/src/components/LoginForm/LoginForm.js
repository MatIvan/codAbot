import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLoginClick }) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const handleSubmint = async e => {
        e.preventDefault();
        onLoginClick(login, password);
    }

    return (
        <form className='form login-form' onSubmit={handleSubmint}>
            <h1>Login</h1>
            <label htmlFor="userName">Name</label>
            <input
                id="userName"
                type="text"
                onChange={e => setLogin(e.target.value)} />
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
