import React from 'react';
import LoginForm from '@/components/forms/login_form';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md md:max-w-5xl bg-white rounded-2xl overflow-hidden shadow-md border border-primary_1 flex flex-col md:flex-row">
        {/* Login form always visible */}
        <LoginForm />
        {/* Background image displayed on desktop */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1559131397-f94da358f7ca?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3")',
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoginPage;
