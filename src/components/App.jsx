import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ThisWeeksSteals from "./ThisWeeksSteals";
import SingleCategory from "./SingleCategory";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/ThisWeeksSteals">
            <ThisWeeksSteals />
          </Route>
          <Route path="/SingleCategory">
            <SingleCategory />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
