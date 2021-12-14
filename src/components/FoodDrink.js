import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import SideBar from "./SideBar";
import Footer from "./Footer";
import AddToCart from "./AddToCart";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function FoodDrink(props) {
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
    (product) => product.categoryId === 2
  );
  const productsToRender = productsToFilter.map((product) => {
    return (
      <>
        {/* <div className="FoodDrinkProducts">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text>
                <p>{product.productDescription}</p>
                <p>Our Price: ${product.currentPrice}</p>
                <p>Qty In Stock: {product.productQuantity}</p>
                <p>MSRP: ${product.MSRP}</p>
                <p>SKU: {product.SKU}</p>
              </Card.Text>
              <AddToCart variant="primary" productId={product.id} />
            </Card.Body>
          </Card> */}
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
          <Link to={`/Product/${product.id}`}>Go to Product!</Link>
        </div>
      </>
    );
  });

  return (
    <>
      <Nav />
      <h2>All you can Eat & Drink!</h2>
      {productsToRender}
      <SideBar />
      <Footer />
    </>
  );
}

export default FoodDrink;
