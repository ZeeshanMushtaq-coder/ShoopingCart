import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function WishList() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-danger text-center">Your WishList</h2>

      {state.wishlist.length === 0 && (
        <h4 className="text-center mt-4">No items in WishList</h4>
      )}

      {state.wishlist.map((item) => (
        <div key={item.id} className="card mt-3 p-3">
          <div className="row align-items-center">
            <div className="col-sm-4 col-md-2">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "90px", height: "90px" }}
              />
            </div>
            <div className="col-sm-8 col-md-5">
              <h5>{item.title}</h5>
              <p className="text-danger fw-bold">
                Rs {Math.round(item.price * 5)}
              </p>
            </div>

            {/* Quantity Buttons */}
            <div className="col-sm-5 col-md-3 col-sm-mt-3 d-flex align-items-center">
              <button
                className="btn btn-warning"
                onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}
              >
                Add to Cart
              </button>
            </div>

            {/* Remove Button */}
            <div className="col-sm-3 col-md-1 col-sm-mt-3">
              <button
                className="btn btn-danger"
                onClick={() =>
                  dispatch({ type: "ADD_TO_WISHLIST", payload: item })
                }
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex align-items-center justify-content-between mt-5">
        <button className="btn btn-danger" onClick={() => navigate("/")}>
          Back Products
        </button>
        <button
          className="btn btn-warning"
          onClick={() => dispatch({ type: "CLEAR_WISHLIST" })}
        >
          Clear WishList
        </button>
      </div>
    </div>
  );
}
