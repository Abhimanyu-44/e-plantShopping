import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

import { useNavigate } from "react-router-dom";

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total amount of all items
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.substring(1));
      return total + price * item.quantity;
    }, 0);
  };

  // Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Checkout (dummy function)
  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  // Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate subtotal for one item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return price * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} width="100" />
              <div>
                <h3>{item.name}</h3>
                <p>Price: {item.cost}</p>
                <p>Subtotal: ₹{calculateTotalCost(item)}</p>

                <button onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: "0 10px" }}>
                  {item.quantity}
                </span>
                <button onClick={() => handleIncrement(item)}>+</button>

                <br /><br />
                <button onClick={() => handleRemove(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total Amount: ₹{calculateTotalAmount()}</h3>

          <button onClick={handleContinueShopping}>
            Continue Shopping
          </button>

          <button onClick={handleCheckoutShopping}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartItem;
