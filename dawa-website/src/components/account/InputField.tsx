import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  errors?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon: Icon,
  errors,
  ...inputProps
}) => (
  <div>
    <label className="block font-semibold text-gray-700 mb-1">{label}</label>
    <div
      className={`flex items-center border rounded-md p-2 bg-gray-50 ${
        errors ? 'border-red-500' : 'border-gray-300'
      }`}
    >
      {Icon && <Icon className="text-gray-400 mr-2" />}
      <input
        {...inputProps}
        className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
        aria-invalid={errors ? 'true' : 'false'}
      />
    </div>
    {errors && <p className="text-sm text-red-500 mt-1">{errors}</p>}
  </div>
);

export default InputField;
