import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import SideBar from "./SideBar";

function Art(props) {
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
    (product) => product.categoryId === 1
  );
  const productsToRender = productsToFilter.map((product) => {
    return (
      <>
        <div>
          <h2>{product.productName}</h2>
          {/*I know Image is not <p> just for testing purposes*/}
          <img src={product.image} />
          <p>{product.productDescription}</p>
          <p>Our Price: ${product.currentPrice}</p>
          <p>Qty In Stock: {product.productQuantity}</p>
          <p>MSRP: ${product.MSRP}</p>
          <p>SKU: {product.SKU}</p>
        </div>
      </>
    );
  });

  return (
    <>
      <Nav />
      <div>Welcome to the Art Section!</div>
      {productsToRender}
      <SideBar />
      <Footer />
    </>
  );
}

export default Art;
