import React from "react";
import { useParams, useHistory } from "react-router-dom";

function DeleteProduct(props) {
  const { id } = useParams();
  const history = useHistory();

  async function deleteProduct(e) {
    e.preventDefault();

    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    history.push("/");
  }
  return (
    <div>
      <button onClick={deleteProduct}>Delete Product!</button>
    </div>
  );
}

export default DeleteProduct;
