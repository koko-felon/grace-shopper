import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Login() {
  return (
    <>
      <Nav />
      <div>This is the Login Page!</div>
      <Link to="/Register">Link to Register Page!</Link>
      <Footer />
    </>
  );
}

export default Login;
