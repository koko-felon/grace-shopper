import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";

function Cart(props) {
  const { cartState, cartDispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);

  useEffect(() => {
    const getCart = async () => {
      const response = await fetch(`/api/orders/users/${userState.id}/cart`);
      const data = await response.json();
      cartDispatch({ type: "SET_CART", value: data });
      console.log(data);
    };

    getCart();
  }, []);

  const products =
    cartState.products &&
    cartState.products.length &&
    cartState.products.map((product) => {
      return (
        <div key={product.productId}>
          <img src={product.imageUrl} />
          <h3>{product.productName}</h3>
          <h4>${product.currentPrice / 100}</h4>
          <h5>{product.productQuantity}</h5>
          <button
            onClick={() => removeFromCart(product.productId, cartState.orderId)}
          >
            Remove from Cart
          </button>
          <span>QTY</span>
          <button
            onClick={() => increaseQty(product.productId, product.qty + 1)}
          >
            +
          </button>
          <button
            onClick={() => decreaseQty(product.productId, product.qty - 1)}
          >
            -
          </button>
        </div>
      );
    });

  const total =
    cartState.products &&
    cartState.products.length &&
    cartState.products
      .map((product) => {
        return product.currentPrice * product.quantity;
      })
      .reduce((prevTotal, currTotal) => prevTotal + currTotal);

  return (
    <>
      <div>
        <Link to="/">Continue Shopping</Link>
        <h3>Your Shopping Bag</h3>
        <br />
        <h3>Order Total: ${total / 100}</h3>
        <br />
        <button>CHECKOUT</button>
      </div>
    </>
  );
}

export default Cart;
