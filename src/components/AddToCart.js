import React, { useState, useEffect } from "react";

function AddToCart({ productId, currentPrice }) {
  const [cart, setCart] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("/api/order_products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        productId,
        historicalPrice: currentPrice,
        productQuantity: 1,
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <button onSubmit={handleSubmit}>Add to Cart!</button>
    </div>
  );
}

export default AddToCart;
