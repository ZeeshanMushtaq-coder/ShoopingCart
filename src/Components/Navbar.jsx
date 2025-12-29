import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("prime_store_state");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo-1.png"
            alt="Logo"
            style={{ width: "70px", height: "55px" }}
          />
          <span className="brand-name">Prime Store</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item position-relative fs-5 me-3">
              <Link className="nav-link position-relative" to="/wishlist">
                WishList
                {state.wishlist?.length > 0 && (
                  <span className="badge bg-warning text-danger position-absolute top-0 start-100 translate-middle badge-circle">
                    {state.wishlist.length}
                  </span>
                )}
              </Link>
            </li>

            <li className="nav-item position-relative me-4">
              <Link className="nav-link position-relative" to="/cartPage">
                <i className="fas fa-shopping-cart text-danger fs-2"></i>
                {state.cart.length > 0 && (
                  <span className="badge bg-warning text-danger position-absolute top-0 start-100 translate-middle badge-circle">
                    {state.cart.length}
                  </span>
                )}
              </Link>
            </li>

            {!state.isLoggedIn ? (
              <div>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </div>
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
