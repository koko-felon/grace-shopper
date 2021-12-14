import React, { createContext, useReducer, useContext } from "react";

const initialState = {};

const cartContext = createContext(initialState);
const { Provider } = cartContext;

const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case "SET_CART": {
        return action.value;
      }
      case "CLEAR_CART": {
        return {};
      }
      case "ADD_TO_CART": {
        const newState = {
          products: [...oldState.products, action.value],
        };
        return newState;
      }
      case "REMOVE_FROM_CART": {
        const newProducts = oldState.products.filter(
          (product) => product.productId !== action.value.productId
        );
        const newState = {
          products: [...newProducts],
        };
        return newState;
      }
      case "CHANGE_QTY": {
        const newProducts = oldState.products.map((product) => {
          if (product.productId === action.value.productId) {
            product.productQuantity = action.value.productQuantity;
          }
          return product;
        });
        const newState = {
          products: [...newProducts],
        };
        return newState;
      }

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ cartState, cartDispatch }}>{children}</Provider>;
};

export { cartContext, CartProvider };
