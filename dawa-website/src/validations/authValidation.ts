import * as yup from 'yup';

/**
 * Regular expression for validating usernames.
 * - At least 3 characters
 * - Only letters, numbers, and underscores
 */
const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

export const authSchema = yup.object({
  emailOrUsername: yup
    .string()
    .required('Username or Email is required')
    .test(
      'usernameOrEmail',
      'Enter a valid email address or username (min 3 characters, letters, numbers, underscores)',
      (value) => {
        if (!value) return false;
        const emailValid = yup.string().email().isValidSync(value);
        const usernameValid = usernameRegex.test(value);
        return emailValid || usernameValid;
      },
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: yup.boolean().default(false),
});

// Improved validation schema
export const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .test('isValidPhone', 'Phone number is invalid', function (value) {
      if (!value) return false;

      // The phone input component removes the + and spaces automatically
      // We just need to verify we have the right number of digits
      const digitOnly = value.replace(/\D/g, '');

      // Allow phone numbers between 10 and 15 digits (including country code)
      return digitOnly.length >= 10 && digitOnly.length <= 15;
    }),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and policies')
    .required(),
});
