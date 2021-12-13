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
          <h2>{product.productName}</h2>
          <img src={product.image} />
          <p>{product.productDescription}</p>
          <p>Price: ${product.currentPrice}</p>
          <p>Qty In Stock: {product.productQuantity}</p>
          <p>MSRP: {product.MSRP}</p>
          <p>SKU: {product.SKU}</p>
        </div>
      </>
    );
  });

  return (
    <>
      <Nav />

      <h2>
        <Link to="/ThisWeeksSteals">
          This Weeks Steals! Get em while they're hot!
        </Link>
      </h2>
      {productsToRender}
    </>
  );
}

export default Sidebar;
