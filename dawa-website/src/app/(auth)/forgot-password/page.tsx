import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address below and we’ll send you instructions on how
          to reset your password.
        </p>

        {/* Reusable Forgot Password Form */}
        <ForgotPasswordForm />

        <p className="mt-8 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <a
            href="/login"
            className="text-primary_1 font-semibold hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
