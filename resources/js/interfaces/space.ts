export interface Space {
  id: string;
  name: string;
  people_capacity: number;
  type: string;
  locality: string;
  amenities: string[];
  services: string[];
  description: string;
  created_at: string;
  updated_at: string;
  address_id: number;
  user_id: number;
  address: Address;
  images: Image[];
  user: User;
}

export interface Address {
  id: number;
  street: string;
  neighborhood: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: number;
  space_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}