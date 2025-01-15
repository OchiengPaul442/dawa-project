import { secureApiClient, openApiClient } from '@/utils/apiClient';
import {
  RegisterRequest,
  ActivationRequest,
  ForgotPasswordRequest,
  ResetPasswordPayload,
} from '@/types/api';

/**
 * Register a new user.
 * @param data - Registration data
 * @returns Registered user data
 */
export const registerUser = async (data: RegisterRequest): Promise<any> => {
  const response = await openApiClient.post('/register/', data);
  return response.data;
};

/**
 * Activate a user account.
 * @param data - Activation token
 * @returns Activation response
 */
export const activateAccount = async (
  data: ActivationRequest,
): Promise<any> => {
  const response = await openApiClient.post('/activateaccount/', data);
  return response.data;
};

/**
 * resend activation email.
 * @param data - Email for activation
 * @returns Response message
 */
export const resendActivationEmail = async (data: {
  email: string;
}): Promise<any> => {
  const response = await openApiClient.post('/resendactivationemail/', data);
  return response.data;
};

/**
 * Initiate forgot password process.
 * @param data - Email for password reset
 * @returns Response message
 */
export const forgotPassword = async (
  data: ForgotPasswordRequest,
): Promise<any> => {
  const response = await openApiClient.post('/forgotpassword/', data);
  return response.data;
};

/**
 * Initiate password reset process.
 * @param data - Email for password reset
 * @returns Response message
 */
export const resetPassword = async (
  data: ResetPasswordPayload,
): Promise<any> => {
  const response = await openApiClient.post('/resetpassword/', data);
  return response.data;
};

/**
 * Get user profile.
 * @returns User profile data
 */
export const getUserProfile = async (): Promise<any> => {
  const response = await secureApiClient.get('/getuserprofile/');
  return response.data;
};
