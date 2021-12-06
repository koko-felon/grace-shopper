import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useHistory, Link } from "react-router-dom";

const Register = ({ setIsLoggedIn }) => {
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
      const response = await fetch(
        `http://dashboard.heroku.com/apps/coco-felon/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      window.localStorage.setItem("token", data.token);

      if (data.token) {
        setIsLoggedIn(true);
        setSuccessMessage("Thanks for registering!");
        setTimeout(() => {
          history.push("/");
        }, 1500);
      } else {
        setErrorMessage(data.message);
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="register">
        <h2>Create an account</h2>
        <br />
        {errorMessage ? <h4>{errorMessage}</h4> : null}
        {successMessage ? <h4>{successMessage}</h4> : null}
        <form className="loginForm" onSubmit={handleSubmit}>
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
        <h3>
          Already have an account?
          <br />
          <Link to="/Login">Click here to sign in!</Link>
        </h3>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Register;
