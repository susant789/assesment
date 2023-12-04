import React, { useState } from "react";
import "./Cart.scss";
import cross from "../assets/cross.svg";
import { useContext } from "react";
import { AppContext } from "../Context";
import { REMOVE_FROM_CART } from "../constants";

function Cart({ cartMenu }) {
  const { state, dispatch } = useContext(AppContext);

  function total() {
    return state.cart.reduce(
      (accumulator, item) => accumulator + item.price,
      0
    );
  }

  return (
    <div
      className={cartMenu || state.cartOpen ? "cart_menu" : "cart_menu change"}
    >
      {/* <div className="cart_header">
        <p className="nav_element">All Products</p>
        <p className="nav_element">Feature Products</p>
        <img src={cart} className="nav_element" alt="cart image" />
        <p className="nav_element">0</p>
      </div> */}
      <h2>Shopping Cart</h2> <span>Total {total()} INR</span>
      <div className="product_container">
        {state.cart?.map((item, index) => {
          return (
            <div className="cart_product" key={index}>
              <img src={item.image} alt="Product image" />
              <div className="cart_right">
                <h3>{item.name}</h3>
                <span>Voilet</span> <span>Woolen</span>
                <p>INR {item.price}</p>
                <button
                  onClick={() => {
                    dispatch({ type: REMOVE_FROM_CART, payload: index });
                  }}
                >
                  Remove <img src={cross} alt="remove icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
