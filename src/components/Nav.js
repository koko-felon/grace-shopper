import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContext";

function Nav() {
  const { userState, userDispatch } = useContext(userContext);

  return (
    <div>
      <Link to="/">Home</Link>
      <div>
        <Link to="/Login">Login /</Link>
        <Link to="/Register"> Register</Link>
        <Link to="/Cart">Add Cart Logo</Link>
      </div>

      <Link to="/Art">Art</Link>
      <Link to="/FoodDrink">Food & Drink</Link>
      <Link to="/Apparel">Apparel</Link>
    </div>
  );
}

export default Nav;
