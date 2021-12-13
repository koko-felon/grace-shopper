import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { userContext } from "../context/userContext";

import {
  Container,
  Dropdown,
  FormControl,
  Navbar,
  Header,
  Badge,
  Button,
} from "react-bootstrap";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CartProvider } from "../context/cartContext";
// import "./styles.css";

function Nav() {
  const { userState, userDispatch } = useContext(userContext);
  const token = localStorage.getItem("token");
  // const {
  //   state: { cart },
  //   dispatch,
  //   productDispatch,
  // } = CartProvider();

  const logout = () => {
    localStorage.clear("token");
    userDispatch({ type: "LOG_OUT", value: null });
  };

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 150 }}>
      <Container>
        <Navbar.Brand>
          <Link class="text-white" to="/">
            <h2>Coco Felons</h2>
          </Link>
        </Navbar.Brand>
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 300 }}
              type="search"
              placeholder="Search for coco goods"
              className="m-auto"
              aria-label="Search"
              // onChange={(e) => {
              //   productDispatch({
              //     type: "FILTER_BY_SEARCH",
              //     payload: e.target.value,
              //   });
              // }}
            />
          </Navbar.Text>
        )}
        <div class="text-white">
          {token ? <h5>Welcome Back, {userState.firstName}!</h5> : null}
          <div>
            {!token ? (
              <>
                <Link to="/Login">Sign In /</Link>
                <Link to="/Register"> Register</Link>
              </>
            ) : (
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                onClick={logout}
              >
                Log Out
              </button>
            )}
            <Link to="/Cart"></Link>
          </div>

          <Link class="text-white" to="/Art">
            Art
          </Link>
          <Link class="text-white" to="/FoodDrink">
            Food & Drink
          </Link>
          <Link class="text-white" to="/Apparel">
            Apparel
          </Link>
        </div>

        <Link to="/cart">
          <HiOutlineShoppingBag alignright="true" color="white" size="30px" />
          <Badge class="text-white">{2}</Badge>
        </Link>
      </Container>
    </Navbar>
  );
}

export default Nav;
