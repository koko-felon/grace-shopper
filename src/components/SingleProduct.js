import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import AddToCart from "./AddToCart";
import UpdateProduct from "./UpdateProduct";
import { userContext } from "../context/userContext";
import DeleteProduct from "./DeleteProduct";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { userState, userDispatch } = useContext(userContext);

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
      <Nav />
      <div>
        <h2>{product.productName}</h2>
        <img src={product.image} />
        <p>{product.productDescription}</p>
        <p>Our Price: ${product.currentPrice}</p>
        <p>Qty In Stock: {product.productQuantity}</p>
        <p>MSRP: ${product.MSRP}</p>
        <p>SKU: {product.SKU}</p>
        <AddToCart productId={product.id} />
        {userState.isAdmin ? (
          <>
            <UpdateProduct setProduct={setProduct} />
            <DeleteProduct />
          </>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default SingleProduct;
