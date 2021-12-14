import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";
import axios from "axios";
import RemoveFromCart from "./RemoveFromCart";

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

  const removeFromCart = async (productId) => {
    if (userState.id) {
      const response = await fetch(
        `/api/order_products/${cartState.orderId}/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      const responseTwo = await fetch(`
      /api/orders/users/${userState.id}/cart
      `);
      const dataTwo = await responseTwo.json();
      console.log({ dataTwo });
      if (dataTwo.products) {
        cartDispatch({ type: "SET_CART", value: dataTwo });
      }
    } else {
      cartDispatch({ type: "REMOVE_FROM_CART", value: { productId } });
    }
  };

  const increaseQty = async (productId, quantity) => {
    if (userState.id) {
      const { data } = await axios.patch("/api/order_products", {
        productId,
        orderId: cartState.orderId,
        quantity,
      });

      const response = await axios.get(
        `/api/orders/users/${userState.id}/cart`
      );

      cartDispatch({ type: "SET_CART", value: response.data });
    } else {
      cartDispatch({
        type: "CHANGE_QTY",
        value: { productId, quantity },
      });
    }
  };

  const decreaseQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeFromCart(productId);
    }
    if (userState.id) {
      const { data } = await axios.patch("/api/order_products", {
        productId,
        orderId: cartState.orderId,
        quantity,
      });
      const response = await axios.get(
        `/api/orders/users/${userState.id}/cart`
      );

      cartDispatch({ type: "SET_CART", value: response.data });
    } else {
      cartDispatch({
        type: "CHANGE_QTY",
        value: { productId, quantity },
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
            <h5>Price: ${product.currentPrice / 100}</h5>
            <h5>Quantity: {product.quantity}</h5>
            <h4>
              Product Total: ${(product.currentPrice * product.quantity) / 100}
            </h4>
            <RemoveFromCart productId={product.productId} />
            <span>QTY</span>
            <button
              onClick={() =>
                increaseQty(product.productId, product.quantity + 1)
              }
            >
              +
            </button>
            <button
              onClick={() =>
                decreaseQty(product.productId, product.quantity - 1)
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
        return product.currentPrice * product.quantity;
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
