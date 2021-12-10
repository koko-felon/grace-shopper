import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components";

import { UserProvider } from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
