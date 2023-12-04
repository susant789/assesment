import React, { createContext, useReducer } from "react";

// Define initial state
const initialState = {
  cartOpen: false,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  data: {
    products: [],
    colors: [],
    materials: [],
    featured: [],
    filtered: [],
  },
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cart, action.payload])
      );
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      const newCart = state.cart.slice();
      newCart.splice(action.payload, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    case "DATA":
      return { ...state, data: action.payload };
    case "CART_TOGGLE":
      return { ...state, cartOpen: !state.cartOpen };
    case "CART_OPEN":
      return { ...state, cartOpen: !state.true };

    default:
      return state;
  }
};

// Create a context with the initial state and reducer
export const AppContext = createContext();

// Create a provider component that wraps the entire app
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
