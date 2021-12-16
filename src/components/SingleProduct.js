import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import AddToCart from "./AddToCart";
import UpdateProduct from "./UpdateProduct";
import { userContext } from "../context/userContext";
import DeleteProduct from "./DeleteProduct";
import { Card } from "react-bootstrap";
import { cartContext } from "../context/cartContext";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { userState, userDispatch } = useContext(userContext);
  const { cartState, cartDispatch } = useContext(cartContext);

  console.log(id);
  console.log(userState);

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`/api/products/${id}`);
      const singleProduct = await response.json();
      setProduct(singleProduct);
    }
    getProduct();
  }, []);

  console.log(product);

  return (
    <>
      <div className="singleProduct">
        <img
          className="singleImg"
          style={{ width: "21rem", height: "330px" }}
          src={product.image}
        />
        <Card style={{ width: "25rem", height: "330px" }}>
          <Card.Body>
            <Card.Title class="singleprodName">
              {" "}
              {product.productName}
            </Card.Title>
            <Card.Text className="txt">
              <p>{product.productDescription}</p>
              <p>Our Price: ${product.currentPrice / 100}</p>
              <p>Qty In Stock: {product.productQuantity}</p>
              <p>MSRP: ${product.MSRP / 100}</p>
              <p>SKU: {product.SKU}</p>
            </Card.Text>
            {cartState.products ? (
              cartState.products.filter((item) => item.productId === product.id)
                .length === 0 ? (
                <AddToCart
                  productId={product.id}
                  currentPrice={product.currentPrice}
                  setProduct={setProduct}
                />
              ) : (
                <p>Added to Cart!</p>
              )
            ) : (
              <AddToCart
                productId={product.id}
                currentPrice={product.currentPrice}
                setProduct={setProduct}
              />
            )}
            {userState.isAdmin ? (
              <>
                <UpdateProduct setProduct={setProduct} />
                <DeleteProduct />
              </>
            ) : null}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
