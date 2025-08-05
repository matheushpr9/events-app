export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  email_verified_at: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthenticatedUser {
  authenticated: boolean;
  user: User;
}
