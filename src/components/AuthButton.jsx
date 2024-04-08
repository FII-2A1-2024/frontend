import React from 'react';
import { Link } from 'react-router-dom';

function AuthButton() {
  return (
    <div className="auth-buttons">
      <Link to="/connect">
        Login/Logout
      </Link>
    </div>
  );
}

export default AuthButton;
