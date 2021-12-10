import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components";

import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
