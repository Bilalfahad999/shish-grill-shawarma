"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem, CartState, Coupon } from "@/types/order";
import { calcDiscount } from "@/lib/coupons";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

// ─── Actions ───────────────────────────────────────────────────────────────────

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; cartId: string }
  | { type: "UPDATE_QUANTITY"; cartId: string; quantity: number }
  | { type: "UPDATE_ITEM"; cartId: string; patch: Partial<CartItem> }
  | { type: "APPLY_COUPON"; coupon: Coupon }
  | { type: "REMOVE_COUPON" }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; state: CartState };

// ─── Reducer ───────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.item] };

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.cartId !== action.cartId) };

    case "UPDATE_QUANTITY": {
      if (action.quantity < 1) return state;
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.cartId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.cartId ? { ...i, ...action.patch } : i
        ),
      };

    case "APPLY_COUPON":
      return { ...state, coupon: action.coupon };

    case "REMOVE_COUPON":
      return { ...state, coupon: null };

    case "CLEAR_CART":
      return { items: [], coupon: null };

    case "HYDRATE":
      return action.state;

    default:
      return state;
  }
}

// ─── Derived values ─────────────────────────────────────────────────────────────

export function calcItemTotal(item: CartItem): number {
  const extrasTotal = item.extras.reduce((sum, e) => sum + e.price * e.quantity, 0);
  return (item.basePrice + extrasTotal) * item.quantity;
}

// ─── Context ────────────────────────────────────────────────────────────────────

type CartContextValue = {
  items: CartItem[];
  coupon: Coupon | null;
  itemCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, qty: number) => void;
  updateItem: (cartId: string, patch: Partial<CartItem>) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  /** True when delivery is selected — caller sets this based on checkout state */
  isDelivery: boolean;
  setIsDelivery: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "shish_cart_v1";

const initialState: CartState = { items: [], coupon: null };

// ─── Provider ───────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isDelivery, setIsDelivery] = useReducerBool(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartState = JSON.parse(raw);
        if (parsed?.items) dispatch({ type: "HYDRATE", state: parsed });
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + calcItemTotal(item), 0),
    [state.items]
  );

  const discount = useMemo(
    () => calcDiscount(state.coupon, subtotal),
    [state.coupon, subtotal]
  );

  const deliveryFee = useMemo(
    () => (isDelivery && subtotal > 0 ? RESTAURANT_CONFIG.deliveryFee : 0),
    [isDelivery, subtotal]
  );

  const total = useMemo(
    () => Math.max(0, subtotal - discount + deliveryFee),
    [subtotal, discount, deliveryFee]
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD_ITEM", item }), []);
  const removeItem = useCallback((cartId: string) => dispatch({ type: "REMOVE_ITEM", cartId }), []);
  const updateQuantity = useCallback(
    (cartId: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", cartId, quantity }),
    []
  );
  const updateItem = useCallback(
    (cartId: string, patch: Partial<CartItem>) => dispatch({ type: "UPDATE_ITEM", cartId, patch }),
    []
  );
  const applyCoupon = useCallback((coupon: Coupon) => dispatch({ type: "APPLY_COUPON", coupon }), []);
  const removeCoupon = useCallback(() => dispatch({ type: "REMOVE_COUPON" }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        coupon: state.coupon,
        itemCount,
        subtotal,
        discount,
        deliveryFee,
        total,
        addItem,
        removeItem,
        updateQuantity,
        updateItem,
        applyCoupon,
        removeCoupon,
        clearCart,
        isDelivery,
        setIsDelivery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Tiny helper hook for a boolean state that feels like useReducer
function useReducerBool(initial: boolean): [boolean, (v: boolean) => void] {
  const [val, setVal] = useReducer((_: boolean, next: boolean) => next, initial);
  return [val, setVal];
}

// ─── Hook ───────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
