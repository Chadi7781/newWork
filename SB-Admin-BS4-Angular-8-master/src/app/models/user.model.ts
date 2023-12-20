// user.model.ts

export interface User {
  _id?: string; // Optional, as it may not be available when creating a new user
  username: string;
  password: string;
  email: string;
  role: string;
  activationToken?: string; // Optional, used for account activation
  isValid?: boolean; // Optional, to indicate whether the user account is activated
  resetPasswordToken?: string;
}
