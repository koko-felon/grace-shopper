import React, { useEffect, useContext } from "react";
import Nav from "./Nav";

import Products from "./Products";

import Footer from "./Footer";
import SideBar from "./SideBar";
import axios from "axios";

import { userContext } from "../context/userContext";
import "../components/styles.css";

function Home(props) {
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
        console.log(data);
        userDispatch({ type: "SET_USER", value: data.user });
      }
    };
    getAuth();
  }, []);

  useEffect(() => {
    const getProductsWithFetch = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log(data);
    };
    const getProductsWithAxios = async () => {
      const response = await axios.get("/api/products");
      const data = response.data;
      console.log("From axios", data);
    };
    getProductsWithFetch();
    getProductsWithAxios();
  }, []);

  return (
    <>
      <div className="home">
        <Products />
      </div>
    </>
  );
}

export default Home;
