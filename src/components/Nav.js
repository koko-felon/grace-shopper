import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { userContext } from "../context/userContext";

function Nav() {
  const { userState, userDispatch } = useContext(userContext);
  const token = localStorage.getItem("token");

  //Make this a auth hook?
  useEffect(() => {
    const getAuth = async () => {
      if (localStorage.token) {
        const response = await fetch(`/api/users/auth`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        userDispatch({ type: "SET_USER", value: data.user });
      }
    };
    getAuth();
  }, []);

  const logout = () => {
    localStorage.clear("token");
    userDispatch({ type: "LOG_OUT", value: null });
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
