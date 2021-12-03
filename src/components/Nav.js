import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/">Home</Link>
      <div>
        <Link to="/Register">Register</Link>
        <Link to="/Login">Login</Link>
      </div>
      <Link to="/SingleCategory">SingleCategory</Link>
    </div>
  );
}

export default Nav;
