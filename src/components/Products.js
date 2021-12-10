import React, { useState, useEffect } from "react";
import AddToCart from "./AddToCart";

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
          <h2>{product.productName}</h2>
          {/*I know Image is not <p> just for testing purposes*/}
          <img src={product.image} />
          <p>{product.productDescription}</p>
          <p>Our Price: ${product.currentPrice}</p>
          <p>Qty In Stock: {product.productQuantity}</p>
          <p>MSRP: ${product.MSRP}</p>
          <p>SKU: {product.SKU}</p>
          <AddToCart productId={product.id} />
        </div>
      </>
    );
  });

  return (
    <>
      <h2>Welcome to your ultimate Coco HQ - Go Nuts!</h2>
      <div>{productsToRender}</div>
    </>
  );
}

export default Products;
