import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cart(props) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      const response = await fetch(`/users/:userId/cart`);
      const data = await response.json();
      setCart(data);
    };

    getCart();
  }, []);

  const cart

  return (
    <>
      <div>
        <Link to="/">Continue Shopping</Link>
        <h3>Your Shopping Bag</h3>
        <br />
        <h3>Order Total: </h3>
        <br />
        <button>CHECKOUT</button>
      </div>
    </>
  );
}

export default Cart;
