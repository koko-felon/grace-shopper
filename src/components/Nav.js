import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { userContext } from "../context/userContext";
import { cartContext } from "../context/cartContext";

function Nav() {
  const { userState, userDispatch } = useContext(userContext);
  const { cartState, cartDispatch } = useContext(cartContext);
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear("token");
    userDispatch({ type: "LOG_OUT", value: null });
    cartDispatch({ type: "CLEAR_CART", value: null });
  };

  return (
    <div>
      {token ? <h3>Welcome Back, {userState.firstName}</h3> : null}
      <Link to="/">Home</Link>
      <div>
        {!token ? (
          <>
            <Link to="/Login">Login /</Link>
            <Link to="/Register"> Register</Link>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        <Link to="/Cart">Add Cart Logo</Link>
      </div>

      <Link to="/Art">Art</Link>
      <Link to="/FoodDrink">Food & Drink</Link>
      <Link to="/Apparel">Apparel</Link>
    </div>
  );
}

export default Nav;
