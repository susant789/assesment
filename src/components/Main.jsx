import React, { useState, useEffect } from "react";
import "./Main.scss";
import {
  fetchProducts,
  fetchColors,
  fetchMaterial,
  fetchFeatured,
} from "../services";
import { useContext } from "react";
import { AppContext } from "../Context";
import { DATA } from "../constants";
import Card from "./Card";
import Pagination from "./Pagination";

function Main() {
  const { state, dispatch } = useContext(AppContext);
  const [colorFilter, setColorFilter] = useState(null);
  const [materialFilter, setMaterialFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(6);

  useEffect(() => {
    Promise.all([
      fetchProducts(),
      fetchColors(),
      fetchMaterial(),
      fetchFeatured(),
    ]).then(([products, colors, materials, featured]) => {
      dispatch({
        type: DATA,
        payload: { products, colors, materials, featured, filtered: products },
      });
    });
  }, []);

  function handleColorFilter(colorId) {
    setColorFilter(colorId);
    const filtered = state.data.products.filter(
      (product) =>
        product.colorId === colorId &&
        (!materialFilter || product.materialId === materialFilter)
    );
    dispatch({ type: DATA, payload: { ...state.data, filtered: filtered } });
  }

  function handleMaterialFilter(materialId) {
    setMaterialFilter(materialId);
    const filtered = state.data.products.filter(
      (product) =>
        product.materialId === materialId &&
        (!colorFilter || product.colorId === colorFilter)
    );
    dispatch({ type: DATA, payload: { ...state.data, filtered: filtered } });
  }

  function handleAll() {
    setMaterialFilter(null);
    setColorFilter(null);
    dispatch({
      type: DATA,
      payload: { ...state.data, filtered: state.data.products },
    });
  }

  const lastPostIndex = currentPage * productPerPage;
  const firstPostIndex = lastPostIndex - productPerPage;
  const currentProducts = state.data.filtered.slice(
    firstPostIndex,
    lastPostIndex
  );

  return (
    <main className="main_container">
      <section className="left">
        <p className="list_heading">Filter</p>
        <div>
          <p className="list_heading">Materials</p>
          <p
            className={
              !colorFilter && !materialFilter ? "list list_active" : "list"
            }
            onClick={handleAll}
          >
            All
          </p>
          {state.data.materials?.map((material) => {
            return (
              <p
                onClick={() => handleMaterialFilter(material.id)}
                key={material.id}
                className={
                  material.id === materialFilter ? "list list_active" : "list"
                }
              >
                {material.name}
              </p>
            );
          })}
        </div>
        <div>
          <p className="list_heading">Colors</p>
          <p
            className={
              !colorFilter && !materialFilter ? "list list_active" : "list"
            }
            onClick={handleAll}
          >
            All
          </p>
          {state.data.colors?.map((color) => {
            return (
              <p
                onClick={() => handleColorFilter(color.id)}
                key={color.id}
                className={
                  color.id === colorFilter ? "list list_active" : "list"
                }
              >
                {color.name}
              </p>
            );
          })}
        </div>
      </section>
      <section className="right">
        <div className="products_container">
          {currentProducts &&
            currentProducts.map((product) => {
              return <Card key={product.id} data={product} />;
            })}
        </div>

        <Pagination
          products={state.data.filtered}
          produtsPerPage={productPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </section>
    </main>
  );
}

export default Main;
