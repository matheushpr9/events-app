export interface UserInfo {
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
  user: UserInfo;
}

export interface SubscriptionStatus {
  isActive: boolean;
  plan: string | null;
  createdAt: string | null;
  isLoading: boolean;
  endsAt: string | null;
}
