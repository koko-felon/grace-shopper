import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <h1>Welcome to the home page!</h1>
          </Route>
          <Route path="/Login">
            <h1>Welcome to the Login page!</h1>
          </Route>
          <Route path="/Register">
            <h1>Welcome to the Register page!</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
