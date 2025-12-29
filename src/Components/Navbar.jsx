import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  // ✅ NEW: React state for navbar
  const [isOpen, setIsOpen] = useState(false);

  const closeNavbar = () => setIsOpen(false);
  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("prime_store_state");
    closeNavbar();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          <img
            src="/logo-1.png"
            alt="Logo"
            style={{ width: "70px", height: "55px" }}
          />
          <span className="brand-name">Prime Store</span>
        </Link>

        {/* ✅ Toggle button */}
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Controlled collapse */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item fs-5 me-3">
              <Link to="/wishlist" className="nav-link" onClick={closeNavbar}>
                WishList
                {state.wishlist?.length > 0 && (
                  <span className="badge bg-warning text-danger ms-1">
                    {state.wishlist.length}
                  </span>
                )}
              </Link>
            </li>

            <li className="nav-item me-4">
              <Link to="/cartPage" className="nav-link" onClick={closeNavbar}>
                <i className="fas fa-shopping-cart text-danger fs-2"></i>
                {state.cart.length > 0 && (
                  <span className="badge bg-warning text-danger ms-1">
                    {state.cart.length}
                  </span>
                )}
              </Link>
            </li>

            {!state.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={closeNavbar}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" onClick={closeNavbar}>
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-success" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
