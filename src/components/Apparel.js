import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import SideBar from "./SideBar";
import Footer from "./Footer";

function Apparel(props) {
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
    (product) => product.categoryId === 3
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
        </div>
      </>
    );
  });

  return (
    <>
      <Nav />
      <div>Welcome to the Apparel Section!</div>
      {productsToRender}
      <SideBar />
      <Footer />
    </>
  );
}

export default Apparel;
