//@ts-check
import React from 'react';
import LoginForm from '../UserPanel/LoginForm/LoginForm'
import UserForm from '../UserPanel/UserForm/UserForm'
import AuthService from '../../services/AuthService';

function UserPanel({ user }) {

  return (
    <div>
      {user ? (
        < UserForm
          user={user}
          onLogoutClick={() => { AuthService.logout() }} />
      ) : (
        <LoginForm
          onLoginClick={(login, pass) => { AuthService.login(login, pass) }} />
      )}
    </div>
  );
}

export default UserPanel;
