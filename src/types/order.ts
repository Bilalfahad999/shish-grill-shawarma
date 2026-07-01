export type CartExtra = {
  name: string;
  price: number;
  quantity: number;
};

export type CartItem = {
  cartId: string;
  menuItemId: string;
  name: string;
  basePrice: number;
  quantity: number;
  extras: CartExtra[];
  notes: string;
  image: string;
  category: string;
};

export type OrderType = "pickup" | "delivery";
export type PickupTime = "asap" | "15" | "30" | "45" | "60";
export type PaymentMethod = "card" | "apple_pay" | "google_pay" | "cash";
export type CouponType = "percentage" | "fixed" | "free_item";
export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "delivered";

export type CustomerDetails = {
  name: string;
  phone: string;
  email: string;
};

export type DeliveryAddress = {
  street: string;
  suburb: string;
  postcode: string;
  notes: string;
};

export type Coupon = {
  code: string;
  type: CouponType;
  value: number;
  description: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  customer: CustomerDetails;
  orderType: OrderType;
  pickupTime: PickupTime;
  deliveryAddress?: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  coupon?: Coupon;
  status: OrderStatus;
  createdAt: string;
};

export type CartState = {
  items: CartItem[];
  coupon: Coupon | null;
};
