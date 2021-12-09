import React from "react";
import { Link } from "react-router-dom";

function Cart(props) {
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
