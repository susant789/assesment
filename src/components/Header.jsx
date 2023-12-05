import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import "./Header.scss";
import Cart from "./Cart";
import { useContext } from "react";
import { AppContext } from "../Context";
import { CART_TOGGLE, DATA, RESET_FILTERS } from "../constants";
import { fetchFeatured } from "../services";

function Header({ scrollMain }) {
  const { state, dispatch } = useContext(AppContext);
  const [hand, setHand] = useState(false);

  let featuredProductsData = state.data.featured;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 680) {
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

  const handleFeaturedProducts = async () => {
    const res = await fetchFeatured();
    const products = state.data.products;
    let dictionary = products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});

    let featuredProducts = res.map((item) => dictionary[item.productId]);

    dispatch({
      type: DATA,
      payload: {
        ...state.data,
        filtered: featuredProducts,
        featured: featuredProducts,
      },
    });
    dispatch({ type: RESET_FILTERS, payload: true });

    scrollMain.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAllProducts = () => {
    dispatch({
      type: DATA,
      payload: {
        ...state.data,
        filtered: state.data.products,
        featured: [],
      },
    });
    dispatch({ type: RESET_FILTERS, payload: true });

    scrollMain.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header>
      <div className="header">
        <nav>
          <div>
            <img
              className={hand ? "nav_logo img_change" : "nav_logo"}
              src={logo}
              alt="page logo"
            />
          </div>
          <div className="nav_right">
            <p
              onClick={handleAllProducts}
              className={
                (hand || state.cartOpen) && !featuredProductsData.length
                  ? "nav_element black"
                  : !(hand || state.cartOpen) && !featuredProductsData.length
                  ? "nav_element white"
                  : (hand || state.cartOpen) && featuredProductsData.length
                  ? "nav_element black nav_element light-grey non-active"
                  : "nav_element light-white non-active"
              }
            >
              All Products
            </p>
            <p
              onClick={handleFeaturedProducts}
              className={
                (hand || state.cartOpen) && featuredProductsData.length
                  ? "nav_element black"
                  : !(hand || state.cartOpen) && featuredProductsData.length
                  ? "nav_element white"
                  : (hand || state.cartOpen) && !featuredProductsData.length
                  ? "nav_element light-grey non-active"
                  : "nav_element light-white non-active"
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
                hand || state.cartOpen
                  ? "nav_element black"
                  : "nav_element white"
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
