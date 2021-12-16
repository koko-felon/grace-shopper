import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import { Card } from "react-bootstrap";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";
import "./styles.css";

function Sidebar(props) {
  const [products, setProducts] = useState([]);
  const { cartState, cartDispatch } = useContext(cartContext);
  const { userState, userDispatch } = useContext(userContext);

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
        <div className="sidebarProducts">
          <Card style={{ width: "auto", height: "650px" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title className="prodName1">
                {product.productName}
              </Card.Title>
              <Card.Text className="txt">
                {/* <p>{product.productDescription}</p> */}
                <p>Our Price: ${product.currentPrice / 100}</p>
                {/* <p>Qty In Stock: {product.productQuantity}</p> */}
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
        {/* <div className="sidebarProducts">
          <h2>{product.productName}</h2>
          <img src={product.image} />

          <p>Our Price: ${product.currentPrice / 100}</p>

          <p>MSRP: ${product.MSRP / 100}</p>
          <p>SKU: {product.SKU}</p>
          <AddToCart
            productId={product.id}
            currentPrice={product.currentPrice}
            setProducts={setProducts}
          />
          <Link to={`/Product/${product.id}`}>View Product!</Link>
        </div> */}
      </>
    );
  });

  return (
    <>
      <div className="sidebarContainer">
        <span className="stealsLink">
          <Link class="text-white" to="/ThisWeeksSteals">
            This Week's Steals!
            <br /> Get em while they're hot!
          </Link>

          <div className="productContainer">{productsToRender}</div>
        </span>
      </div>
    </>
  );
}

export default Sidebar;
