import React, { useState } from "react";
import Nav from "./Nav";
import { Link, useHistory } from "react-router-dom";
import Footer from "./Footer";

const Login = ({ setIsLoggedIn }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  // const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data.token);
    window.localStorage.setItem("token", data.token);

    if (data.token) {
      setIsLoggedIn(true);
      setSuccessMessage("Welcome back!");

      history.push("/");
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <>
      <Nav />
      <div className="login">
        <h2>Welcome Back Felon!</h2>
        <br />
        {errorMessage ? <h4>{errorMessage}</h4> : null}
        {successMessage ? <h4>{successMessage}</h4> : null}
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />

          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Sign In" />
        </form>
        <br />
        <h3>
          Don't have an account yet?
          <br />
          <Link to="/Register">Click here to get you set up!</Link>
        </h3>
        <br />
      </div>

      <Footer />
    </>
  );
};

export default Login;
