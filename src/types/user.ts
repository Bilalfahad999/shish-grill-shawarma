export interface DeliveryAddress {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: DeliveryAddress;
}

export interface UserState {
  isLoggedIn: boolean;
  profile: UserProfile | null;
}
