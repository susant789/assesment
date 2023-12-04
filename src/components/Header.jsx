import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import "./Header.scss";
import Cart from "./Cart";
import { useContext } from "react";
import { AppContext } from "../Context";
import { CART_TOGGLE } from "../constants";

function Header() {
  const { state, dispatch } = useContext(AppContext);
  const [hand, setHand] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 655) {
        setHand(true);
      } else {
        setHand(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div className="header">
        <nav>
          <div className="nav_logo">
            <img src={logo} alt="page logo" />
          </div>
          <div className="nav_right">
            <p
              className={
                hand || state.cartOpen ? "nav_element_change" : "nav_element"
              }
            >
              All Products
            </p>
            <p
              className={
                hand || state.cartOpen
                  ? "nav_element_change sec_nav_element_change"
                  : "nav_element sec_nav_element"
              }
            >
              Feature Products
            </p>
            <img
              onClick={() => {
                dispatch({ type: CART_TOGGLE });
              }}
              style={{ transform: "translateX(1rem)" }}
              src={cart}
              className={hand || state.cartOpen ? "img_change" : "nav_element"}
              alt="cart image"
            />
            <p
              className={
                hand || state.cartOpen ? "nav_element_change" : "nav_element"
              }
            >
              {state.cart.length}
            </p>
          </div>
        </nav>
        <div className="content">
          <h2>Latest Styles</h2>
          <p>At Yesterdays Prices</p>
          <button>Browse All Styles</button>
        </div>
        <Cart />
      </div>
    </header>
  );
}

export default Header;
