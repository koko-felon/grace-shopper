import React from "react";
import { Link } from "react-router-dom";

function Nav() {
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
