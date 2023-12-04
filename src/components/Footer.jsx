import React from "react";
import footer_logo from "../assets/footer_logo.svg";
import footer_cards from "../assets/cards.svg";
import logo from "../assets/logo.svg";
import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <section className="footer_left">
        <img src={logo} alt="logo" />
        <p className="footer_nav">Home</p>
        <p className="footer_nav">All Products</p>
        <p className="footer_nav">Feature Products</p>
        <p className="footer_nav">Contact</p>
        <p className="footer_nav">About Us</p>
      </section>
      <section className="footer_middle">
        <p>
          We are a registered E-Commerce seller and we support a variety of
          local and international payment modes
        </p>
        <img src={footer_cards} alt="footer cards" />
      </section>
      <section></section>
      <section className="footer_right">
        <img src={footer_logo} alt="footer logo" />
      </section>
    </footer>
  );
}

export default Footer;
