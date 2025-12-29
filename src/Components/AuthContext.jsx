import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isSignedUp: false,
  isLoggedIn: false,
  userName: "",
  cart: [],
  wishlist: [],
  expandedDesc: [],
};

function authReducer(state, action) {
  switch (action.type) {
    // Sign Up
    case "SIGN_UP":
      return {
        ...state,
        isSignedUp: true,
        isLoggedIn: true,
        userName: action.payload,
      };

    // Login
    case "LOGIN":
      return { ...state, isLoggedIn: true };

    // Logout
    case "LOGOUT":
      return { ...state, isLoggedIn: false, isSignedUp: false };

    // Add to Cart
    case "ADD_TO_CART":
      const exist = state.cart.find((item) => item.id === action.payload.id);
      if (exist) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };

    // Remove From Cart
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    // Increament Quantity
    case "INCREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };

    // Decreament Quantity
    case "DECREMENT_QTY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
          )
          .filter((item) => item.qty > 0),
      };

    // Add to Whish List
    case "ADD_TO_WISHLIST":
      const existWishlist = state.wishlist?.find(
        (item) => item.id === action.payload.id
      );
      if (existWishlist) {
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
      return {
        ...state,
        wishlist: [...(state.wishlist || []), action.payload],
      };

    // Clear Cart
    case "CLEAR_CART":
      return { ...state, cart: [] };

    // Clear WishList
    case "CLEAR_WISHLIST":
      return { ...state, wishlist: [] };

    // Toggle Expanded Description
    case "TOGGLE_EXPAND_DESCRIPTION":
      const exists = state.expandedDesc.includes(action.payload);
      return {
        ...state,
        expandedDesc: exists
          ? state.expandedDesc.filter((id) => id !== action.payload)
          : [...state.expandedDesc, action.payload],
      };

    default:
      return state;
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
