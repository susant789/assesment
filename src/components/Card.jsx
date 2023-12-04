import React, { useState } from "react";
import "./Card.scss";
import { useContext } from "react";
import { AppContext } from "../Context";
import { ADD_TO_CART, CART_OPEN } from "../constants";

function Card({ data }) {
  const { state, dispatch } = useContext(AppContext);
  const [hover, setHover] = useState(false);

  function getColorName(colorId) {
    const color = state.data.colors.find((color) => {
      return color.id === colorId;
    });

    return color ? color.name : "Unknown Color";
  }

  function getMaterialName(materialId) {
    const material = state.data.materials.find((material) => {
      return material.id === materialId;
    });

    return material ? material.name : "Unknown Material";
  }

  return (
    <div
      className="card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {data && (
        <>
          <div className="front">
            <img src={data.image} alt="product image" />
            <div className="product_details">
              <h3 className="product_name">{data.name}</h3>
              <span className="product_color">
                {getColorName(data.colorId)}
              </span>{" "}
              <span className="product_material">
                {getMaterialName(data.materialId)}
              </span>
            </div>
            <p className="price">INR {data.price}</p>
          </div>
          {hover && (
            <div className="Card_hover center">
              <button
                onClick={() => {
                  dispatch({ type: ADD_TO_CART, payload: data });
                  dispatch({ type: CART_OPEN });
                }}
              >
                Add to Cart
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Card;
