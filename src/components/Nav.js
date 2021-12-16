import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { userContext } from "../context/userContext";
import { cartContext } from "../context/cartContext";

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
import Products from "./Products";
import "./styles.css";
import Cart from "./Cart";

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
    <Navbar style={{ height: 120 }}>
      <Container>
        <div className="anim">
          {/* <img className="koko" src="/src/image/koko-felon-logo.png" alt="" /> */}
          <Link id="header" class="text-white" to="/">
            <h1>Coco Felons</h1>
          </Link>
        </div>
        <Link id="categoryNav" class="text-white grow" to="/Art">
          Art
        </Link>
        <Link id="categoryNav" class="text-white grow" to="/FoodDrink">
          Food & Drink
        </Link>
        <Link id="categoryNav" class="text-white grow" to="/Apparel">
          Apparel
        </Link>

        <Navbar.Text className="search">
          <FormControl
            style={{ width: 200, height: 23 }}
            type="search"
            placeholder="Search the goods"
            className="m-auto"
            aria-label="Search"
          />
        </Navbar.Text>

        <div class="text-white">
          {token ? <h5>Hello, {userState.firstName}!</h5> : null}
          <div>
            {!token ? (
              <>
                <Link class="text-white" to="/Login">
                  Sign In /
                </Link>
                <Link class="text-white" to="/Register">
                  {" "}
                  Register
                </Link>
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
        </div>

        <Link to="/cart">
          <HiOutlineShoppingBag alignright="true" color="white" size="40px" />
          {/* <Badge class="text-white">{cartState.products.length}</Badge> */}
        </Link>
      </Container>
    </Navbar>
  );
}

export default Nav;
