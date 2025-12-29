import { useState, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("card");

  const total = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.price * 5 * item.qty, 0),
    [state.cart]
  );

  const handlePayment = () => {
    alert(`Payment Successful via ${paymentMethod}`);
      dispatch({ type: "CLEAR_CART" });
      navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-danger text-center">Checkout</h2>

      {state.cart.map((item) => (
        <p key={item.id}>
          {item.title} × {item.qty}
        </p>
      ))}

      <h4>Total: Rs {Math.round(total)}</h4>

      <div className="my-3">
        <button
          className={`btn me-2 ${
            paymentMethod === "card" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          Card
        </button>

        <button
          className={`btn ${
            paymentMethod === "cash" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setPaymentMethod("cash")}
        >
          Cash
        </button>
      </div>

      <button className="btn btn-success" onClick={handlePayment}>
        Confirm Payment
      </button>
    </div>
  );
}
