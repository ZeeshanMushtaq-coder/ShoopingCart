import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

/* ================================
   ✅ NEW: Load state from localStorage
================================ */
const getInitialState = () => {
  const savedState = localStorage.getItem("prime_store_state");
  return savedState
    ? JSON.parse(savedState)
    : {
        isSignedUp: false,
        isLoggedIn: false,
        userName: "",
        cart: [],
        wishlist: [],
        expandedDesc: [],
      };
};

function authReducer(state, action) {
  switch (action.type) {
    case "SIGN_UP":
      return {
        ...state,
        isSignedUp: true,
        isLoggedIn: true,
        userName: action.payload,
      };

    case "LOGIN":
      return { ...state, isLoggedIn: true };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        isSignedUp: false,
        cart: [],
        wishlist: [],
      };

    case "ADD_TO_CART": {
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
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };

    case "DECREMENT_QTY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
          )
          .filter((item) => item.qty > 0),
      };

    case "ADD_TO_WISHLIST": {
      const exists = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((item) => item.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "CLEAR_WISHLIST":
      return { ...state, wishlist: [] };

    case "TOGGLE_EXPAND_DESCRIPTION": {
      const exists = state.expandedDesc.includes(action.payload);
      return {
        ...state,
        expandedDesc: exists
          ? state.expandedDesc.filter((id) => id !== action.payload)
          : [...state.expandedDesc, action.payload],
      };
    }

    default:
      return state;
  }
}

export default function AuthProvider({ children }) {
  /* ================================
     ✅ CHANGE #1: initialState from localStorage
  ================================ */
  const [state, dispatch] = useReducer(authReducer, {}, getInitialState);

  /* ================================
     ✅ CHANGE #2: Save state to localStorage
  ================================ */
  useEffect(() => {
    localStorage.setItem("prime_store_state", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
