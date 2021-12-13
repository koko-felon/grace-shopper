import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import AddToCart from "./AddToCart";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  console.log(id);

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`/api/products/${id}`);
      const singleProduct = await response.json();
      setProduct(singleProduct);
    }
    getProduct();
  }, []);

  console.log(product);

  return (
    <>
      <Nav />
      <div>
        <h2>{product.productName}</h2>
        <img src={product.image} />
        <p>{product.productDescription}</p>
        <p>Our Price: ${product.currentPrice}</p>
        <p>Qty In Stock: {product.productQuantity}</p>
        <p>MSRP: ${product.MSRP}</p>
        <p>SKU: {product.SKU}</p>
        <AddToCart productId={product.id} />
      </div>
      <Footer />
    </>
  );
}

export default SingleProduct;
