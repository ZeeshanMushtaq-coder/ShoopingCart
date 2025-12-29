import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useMemo } from "react";

export default function CartPage() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const total = useMemo(() => {
    return state.cart.reduce((acc, item) => acc + item.price * 5 * item.qty, 0);
  }, [state.cart]);

  return (
    <div className="container" style={{marginTop: "90px"}}>
      <h2 className="text-danger text-center mb-5">Your Selected Items</h2>

      {state.cart.length === 0 && (
        <h4 className="text-center mt-4">No items in cart</h4>
      )}

      {state.cart.map((item) => (
        <div key={item.id} className="card mt-3 p-3">
          <div className="row align-items-center">
            <div className="col-sm-4 col-md-2">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "90px", height: "90px" }}
              />
            </div>
            <div className="col-sm-6 col-md-4">
              <h5>{item.title}</h5>
              <p className="text-danger fw-bold">
                Rs {Math.round(item.price * 5)}
              </p>
            </div>

            {/* Quantity Buttons */}
            <div className="col-sm-5 col-md-3 d-flex align-items-center">
              <button
                className="btn btn-sm btn-warning"
                onClick={() =>
                  dispatch({ type: "DECREMENT_QTY", payload: item.id })
                }
              >
                Decrease -
              </button>

              <span className="mx-3 fw-bold">{item.qty}</span>

              <button
                className="btn btn-sm btn-success"
                onClick={() =>
                  dispatch({ type: "INCREMENT_QTY", payload: item.id })
                }
              >
                + Increase
              </button>
            </div>

            <div className="col-sm-3 col-md-2">
              <h6>Total: Rs {Math.round(item.price * 5 * item.qty)}</h6>
            </div>

            {/* Remove Button */}
            <div className="col-sm-4 col-md-1">
              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                }
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {state.cart.length > 0 && (
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-warning" onClick={() => navigate("/")}>
            Back Products
          </button>
          <div className="mt-4 text-center">
            <h3 className="text-danger fs-italic">
              Grand Total: Rs {Math.round(total)}
            </h3>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
          <button
            className="btn btn-warning"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
