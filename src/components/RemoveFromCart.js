import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context/userContext";
import { cartContext } from "../context/cartContext";

function RemoveFromCart({ productId }) {
  const { userState, userDispatch } = useContext(userContext);
  const { cartState, cartDispatch } = useContext(cartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div>
      <button id="removeCart" onClick={handleSubmit}>
        Remove from Cart!
      </button>
    </div>
  );
}

export default RemoveFromCart;
