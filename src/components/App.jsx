import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ThisWeeksSteals from "./ThisWeeksSteals";
import Footer from "./Footer";
import Cart from "./Cart";
import Nav from "./Nav";
import Sidebar from "./SideBar";
import Art from "./Art";
import FoodDrink from "./FoodDrink";
import Apparel from "./Apparel";
import Checkout from "./Checkout";

import SingleProduct from "./SingleProduct";

import "./styles.css"


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
    <div className="App">
      <Nav />
      <div className="homeFlex">
     <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Login">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/Register">
            <Register setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/Cart">
            <Cart setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/ThisWeeksSteals">
            <ThisWeeksSteals />
          </Route>
          <Route className="Art" path="/Art">
            <Art />
          </Route>
          <Route path="/FoodDrink">
            <FoodDrink />
          </Route>
          <Route path="/Apparel">
            <Apparel />
          </Route>
          <Route path="/Checkout">
            <Checkout setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          <Route path="/Product/:id">
            <SingleProduct />
          </Route>
        </Switch>
      
      </div>
      <Footer />
    </div>
    </Router>
  );
};

export default App;
