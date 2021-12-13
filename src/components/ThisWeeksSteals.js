import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";

function ThisWeeksSteals(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`/api/products`);
      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  const productsToFilter = products.filter(
    (product) => product.id === 6 || product.id === 7 || product.id === 9
  );

  const productsToRender = productsToFilter.map((product) => {
    return (
      <>
        <div>
          <h2>Product: {product.productName}</h2>
          <img src={product.image} />
          <p>Description: {product.productDescription}</p>
          <p>Price: {product.currentPrice}</p>
          <p>Quantity: {product.productQuantity}</p>
          <p>MSRP: {product.MSRP}</p>
          <p>SKU: {product.SKU}</p>
          <AddToCart />
          <Link to={`/Product/${product.id}`}>Go to Product!</Link>
        </div>
      </>
    );
  });

  return (
    <>
      <Nav />
      <h1>THIS WEEKS STEALS!</h1>
      {productsToRender}
      <Footer />
    </>
  );
}

export default ThisWeeksSteals;
