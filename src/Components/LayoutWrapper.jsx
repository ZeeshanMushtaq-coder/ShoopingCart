import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import Products from "./Products";
import CartPage from "./CartPage";
import WishList from "./WishList";
import LoginCard from "./Login";
import SignUpCard from "./SignUp";
import Checkout from "./Checkout";

export default function LayoutWrapper() {
  const location = useLocation();
  const { state } = useAuth();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  if (!state.isSignedUp && location.pathname !== "/signup") {
    return <Navigate to="/signup" replace />;
  }

  if (state.isSignedUp && !state.isLoggedIn && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/signup" element={<SignUpCard />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}
