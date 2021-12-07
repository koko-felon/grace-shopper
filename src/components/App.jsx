import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ThisWeeksSteals from "./ThisWeeksSteals";
import Art from "./Art";
import FoodDrink from "./FoodDrink";
import Apparel from "./Apparel";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
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
          <Route path="/ThisWeeksSteals">
            <ThisWeeksSteals />
          </Route>
          <Route path="/Art">
            <Art />
          </Route>
          <Route path="/FoodDrink">
            <FoodDrink />
          </Route>
          <Route path="/Apparel">
            <Apparel />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
