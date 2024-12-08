export interface RegisterRequest {
  firstname: string;
  lastname: string;
  contact: string;
  user_role: string;
  email: string;
  password: string;
}

export interface ActivationRequest {
  email: string;
  activation_code: string;
}

export interface ForgotPasswordRequest {
  email: string;
}
