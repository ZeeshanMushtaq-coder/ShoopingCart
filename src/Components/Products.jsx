import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";
import { memo, useCallback } from "react";

// Fetch Data
async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}

/* ---------- Memoized Card ---------- */
const ProductCard = memo(function ProductCard({
  product,
  wishlist,
  expandedDesc,
  onLike,
  onAddToCart,
  onToggleReadMore,
}) {
  const liked = wishlist.find((i) => i.id === product.id);

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
      <div className="card h-100">
        <div className="d-flex justify-content-center bg-success">
          <img
            src={product.image}
            alt={product.title}
            className="p-3"
            style={{ width: 200, height: 200 }}
          />
        </div>

        <span className="icon-placement" onClick={() => onLike(product)}>
          <i className={liked ? "fas fa-heart" : "far fa-heart"}></i>
        </span>

        <div className="card-body">
          <h6 className="product-title">{product.title.slice(0, 30)}...</h6>

          <p>
            {expandedDesc.includes(product.id)
              ? product.description
              : product.description.slice(0, 80) + "..."}
            <button
              className="btn btn-link p-0 ms-1"
              onClick={() => onToggleReadMore(product.id)}
            >
              {expandedDesc.includes(product.id) ? "Read Less" : "Read More"}
            </button>
          </p>

          <div className="d-flex justify-content-between">
            <b className="text-success">Rs {Math.round(product.price * 5)}</b>
            <button
              className="btn btn-danger"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

/* ---------- Main Component ---------- */
export default function Products() {
  const { state, dispatch } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const toggleLike = useCallback(
    (p) => dispatch({ type: "ADD_TO_WISHLIST", payload: p }),
    [dispatch]
  );

  const addToCart = useCallback(
    (p) => dispatch({ type: "ADD_TO_CART", payload: p }),
    [dispatch]
  );

  const toggleReadMore = useCallback(
    (id) => dispatch({ type: "TOGGLE_EXPAND_DESCRIPTION", payload: id }),
    [dispatch]
  );

  if (isLoading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (error) return <h3 className="text-center mt-5">Error</h3>;

  return (
    <div className="container">
      <h2 className="text-danger text-center" style={{marginTop: "90px"}}>Products</h2>
      <div className="row">
        {data.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            wishlist={state.wishlist}
            expandedDesc={state.expandedDesc}
            onLike={toggleLike}
            onAddToCart={addToCart}
            onToggleReadMore={toggleReadMore}
          />
        ))}
      </div>
    </div>
  );
}
