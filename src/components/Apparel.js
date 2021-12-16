import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import SideBar from "./SideBar";
import Footer from "./Footer";

import { Card } from "react-bootstrap";
import AddToCart from "./AddToCart";

import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";

function Apparel(props) {
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
    (product) => product.categoryId === 3
  );
  const productsToRender = productsToFilter.map((product) => {
    return (
      <>
        <div className="apparelProducts">
          <Card style={{ width: "20rem", height: "690px" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title class="prodName">{product.productName}</Card.Title>
              <Card.Text className="txt">
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
      <h2>When you feel like wearing Coco</h2>
      <div className="productContainer">{productsToRender}</div>
    </>
  );
}

export default Apparel;
