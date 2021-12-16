import React, { useState } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct({ setProduct }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [MSRP, setMSRP] = useState("");
  const [SKU, setSKU] = useState("");

  const { id } = useParams();

  async function editProduct(e) {
    e.preventDefault();
    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        productDescription,
        currentPrice,
        productQuantity,
        MSRP,
        SKU,
      }),
    });
    const editProduct = await response.json();
    const response2 = await fetch(`/api/products/${id}`);
    const product = await response2.json();
    setProduct(product);
    console.log(editProduct);
  }

  return (
    <div className="editProduct">
      <h2>Edit Product!</h2>
      <br />
      <form className="editForm" onSubmit={editProduct}>
        <label>
          <input
            value={productName}
            placeholder="Product Name"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          <input
            value={productDescription}
            placeholder="Product Desc."
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          <input
            value={currentPrice}
            placeholder="Current Price"
            onChange={(e) => {
              setCurrentPrice(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          <input
            value={productQuantity}
            placeholder="Product Quantity"
            onChange={(e) => {
              setProductQuantity(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          <input
            value={MSRP}
            placeholder="MSRP"
            onChange={(e) => {
              setMSRP(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          <input
            value={SKU}
            placeholder="SKU"
            onChange={(e) => {
              setSKU(e.target.value);
            }}
          />
        </label>
        <br />
        <button type="submit">Edit Product!</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
