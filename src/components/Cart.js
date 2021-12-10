import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";

function Cart(props) {
  const { cartState, cartDispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);

  useEffect(() => {
    const getCart = async () => {
      const response = await fetch(`/api/orders/users/1/cart`);
      const data = await response.json();
      cartDispatch({ type: "SET_CART", value: data });
    };

    getCart();
  }, []);

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
