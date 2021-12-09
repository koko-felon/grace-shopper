import React, { useState, useEffect } from "react";

function Products(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`/api/products`);
      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  const productsToRender = products.map((product) => {
    return (
      <>
        <div>
          <h2>Product: {product.productName}</h2>
          {/*I know Image is not <p> just for testing purposes*/}
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
      <h2>These are our Products!</h2>
      <div>{productsToRender}</div>
    </>
  );
}

export default Products;
