import React, { useState, useContext } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useHistory, Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";

const Register = ({ setIsLoggedIn }) => {
  const { cartState, cartDispatch } = useContext(cartContext);
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      console.log("About to Register....");
      const response = await fetch(`/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      window.localStorage.setItem("token", data.token);

      if (data.token) {
        setIsLoggedIn(true);
        setSuccessMessage("Welcome to your new Felons account!");
        const response = await fetch(`/api/orders/users/${data.user.id}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const createdCart = await response.json();
        console.log(createdCart);
        cartDispatch({
          type: "SET_CART",
          value: createdCart,
        });

        history.push("/");
      } else {
        setErrorMessage(data.message);
      }
    }
  };

  return (
    <>
      <div className="register">
        <h2>Create an account</h2>
        <br />
        {errorMessage ? <h4>{errorMessage}</h4> : null}
        {successMessage ? <h4>{successMessage}</h4> : null}
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              required
              minLength="1"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="text"
              required
              minLength="1"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="text"
              required
              minLength="4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="text"
              required
              minLength="4"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              required
              minLength="6"
              name="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              required
              minLength="6"
              name="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <br />
        <h5>
          Already have an account?
          <br />
          <Link to="/Login">Click here to sign in!</Link>
        </h5>
        <br />
      </div>
    </>
  );
};

export default Register;
