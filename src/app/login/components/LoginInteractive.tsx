'use client';

import React from 'react';
import LoginForm from './LoginForm';

const LoginInteractive = () => {
  const handleLoginSuccess = (userData: { email: string; name: string }) => {
    console.log('Login successful:', userData);
  };

  return (
    <div className="space-y-6">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginInteractive;