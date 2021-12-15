import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import SideBar from "./SideBar";

import { Card } from "react-bootstrap";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";

function Art(props) {
  const [products, setProducts] = useState([]);
  const { cartState, cartDispatch } = useContext(cartContext);

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
        <div className="ArtProducts">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title class="prodName">{product.productName}</Card.Title>
              <Card.Text>
                <p>{product.productDescription}</p>
                <p>Our Price: ${product.currentPrice / 100}</p>
                <p>Qty In Stock: {product.productQuantity}</p>
                <p>MSRP: ${product.MSRP / 100}</p>
                <p>SKU: {product.SKU}</p>
              </Card.Text>
              {cartState.products ? (
                cartState.products.filter(
                  (item) => item.productId === product.id
                ).length === 0 ? (
                  <AddToCart
                    variant="primary"
                    productId={product.id}
                    currentPrice={product.currentPrice}
                    setProducts={setProducts}
                  />
                ) : (
                  <p>Added to Cart!</p>
                )
              ) : (
                <AddToCart
                  productId={product.id}
                  currentPrice={product.currentPrice}
                  setProducts={setProducts}
                />
              )}
              <Link to={`/Product/${product.id}`}>View Product</Link>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  });

  return (
    <>
      <Nav />
      <h2>Feeling Artsy?</h2>
      <div className="productContainer">{productsToRender}</div>
      <SideBar />
      <Footer />
    </>
  );
}

export default Art;
