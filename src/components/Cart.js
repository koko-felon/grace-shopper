import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";
import axios from "axios";
import AddToCart from "./AddToCart";

function Cart(props) {
  const { cartState, cartDispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);

  // useEffect(() => {
  //   const getCart = async () => {
  //     const response = await fetch(`/api/orders/users/${userState.id}/cart`);
  //     const data = await response.json();
  //     cartDispatch({ type: "SET_CART", value: data });
  //     console.log(data);
  //   };

  useEffect(() => {}, []);

  const removeFromCart = async (productId, orderId) => {
    if (userState.id) {
      console.log("BEGIN REMOVING FROM CART", { productId, orderId });
      const { data } = await axios.delete(
        `/api/orders_products/${orderId}/${productId}`
      );
      console.log("DELETE RESPONSE::::", data);
      const response = await axios.get(`/api/orders/user/${userState.id}/cart`);
      console.log("IS THIS A CART?????", response.data);
      cartDispatch({ type: "SET_CART", value: response.data });
    } else {
      cartDispatch({ type: "REMOVE_FROM_CART", value: { productId } });
    }
  };

  const increaseQty = async (productId, productQuantity) => {
    if (userState.id) {
      const { data } = await axios.patch("/api/order_products", {
        productId,
        orderId: cartState.orderId,
        productQuantity,
      });
      const response = await axios.get(`/api/orders/user/${userState.id}/cart`);

      cartDispatch({ type: "SET_CART", value: response.data });
    } else {
      cartDispatch({
        type: "CHANGE_QTY",
        value: { productId, productQuantity },
      });
    }
  };

  const decreaseQty = async (productId, productQuantity) => {
    if (productQuantity === 0) {
      await removeFromCart(productId, cartState.orderId);
    }
    if (userState.id) {
      const { data } = await axios.patch("/api/order_products", {
        productId,
        orderId: cartState.orderId,
        productQuantity,
      });
      const response = await axios.get(`/api/orders/user/${userState.id}/cart`);

      cartDispatch({ type: "SET_CART", value: response.data });
    } else {
      cartDispatch({
        type: "CHANGE_QTY",
        value: { productId, productQuantity },
      });
    }
  };

  const products =
    cartState.products &&
    cartState.products.length &&
    cartState.products.map((product) => {
      return (
        <>
          <div key={product.productId}>
            <img src={product.imageUrl} />
            <h3>{product.productName}</h3>
            <h4>${product.currentPrice / 100}</h4>
            <h5>{product.productQuantity}</h5>
            <button
              onClick={() =>
                removeFromCart(product.productId, cartState.orderId)
              }
            >
              Remove from Cart
            </button>
            <span>QTY</span>
            <button
              onClick={() =>
                increaseQty(product.productId, product.productQuantity + 1)
              }
            >
              +
            </button>
            <button
              onClick={() =>
                decreaseQty(product.productId, product.productQuantity - 1)
              }
            >
              -
            </button>
          </div>
        </>
      );
    });

  const total =
    cartState.products &&
    cartState.products.length &&
    cartState.products
      .map((product) => {
        return product.currentPrice * product.productQuantity;
      })
      .reduce((prevTotal, currTotal) => prevTotal + currTotal);

  return (
    <>
      <div>
        <Link to="/">Continue Shopping</Link>
        <h3>Your Shopping Bag</h3>
        <br />
        {products ? products : <span>Nothing in Your Cart!</span>}
        <h3>Order Total: ${total / 100}</h3>
        <br />
        <button>CHECKOUT</button>
      </div>
    </>
  );
}

export default Cart;
