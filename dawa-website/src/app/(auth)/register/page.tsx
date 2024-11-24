import React from 'react';
import Register_form from '@/components/forms/registration_form';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        <div
          className="hidden md:block w-[40%] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1523705480679-b5d0cc17a656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lnbnVwfGVufDB8fDB8fHww")',
          }}
        ></div>
        <Register_form />
      </div>
    </div>
  );
};

export default SignupPage;
