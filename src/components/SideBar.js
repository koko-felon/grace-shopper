import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

function Sidebar() {
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
          <p>Price: {product.currentPrice}</p>
          <p>Quantity: {product.productQuantity}</p>
        </div>
      </>
    );
  });

  return (
    <>
      <Nav />
      <h1>This is the sidebar!!!!!</h1>
      <h2>
        <Link to="/ThisWeeksSteals">This Weeks Steals!</Link>
      </h2>
      {productsToRender}
      <Footer />
    </>
  );
}

export default Sidebar;
