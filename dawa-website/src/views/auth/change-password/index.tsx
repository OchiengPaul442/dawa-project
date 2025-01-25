'use client';

import React from 'react';
import ChangePasswordForm from '@/components/forms/ChangePasswordForm';

const ChangePasswordPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md border-primary_1 border px-8 py-12">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Your Password
        </h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
