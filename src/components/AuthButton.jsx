import React from 'react';
import { Link } from 'react-router-dom';
import './AuthButton.css';

function AuthButton() {
  return (
    <div className="auth-buttons">
      <Link to="/">
        Login
      </Link>
    </div>
  );
}

export default AuthButton;

