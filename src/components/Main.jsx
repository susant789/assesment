import React, { useState, useEffect } from "react";
import "./Main.scss";
import { fetchProducts, fetchColors, fetchMaterial } from "../services";
import { useContext } from "react";
import { AppContext } from "../Context";
import { DATA, RESET_FILTERS } from "../constants";
import Card from "./Card";
import Pagination from "./Pagination";

function Main({ mainref }) {
  const { state, dispatch } = useContext(AppContext);
  const [colorFilter, setColorFilter] = useState(null);
  const [materialFilter, setMaterialFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchColors(), fetchMaterial()]).then(
      ([products, colors, materials]) => {
        dispatch({
          type: DATA,
          payload: {
            products,
            colors,
            materials,
            featured: [],
            filtered: products,
          },
        });
      }
    );
  }, []);

  useEffect(() => {
    if (state.resetFilters === true) {
      setMaterialFilter(null);
      setColorFilter(null);
    }
  }, [state.resetFilters]);

  const toBeFiltered = () => {
    return state.data.featured.length
      ? state.data.featured
      : state.data.products;
  };

  function handleColorFilter(colorId) {
    setColorFilter(colorId);

    const filtered = toBeFiltered().filter(
      (product) =>
        product.colorId === colorId &&
        (!materialFilter || product.materialId === materialFilter)
    );
    dispatch({ type: DATA, payload: { ...state.data, filtered: filtered } });
    dispatch({ type: RESET_FILTERS, payload: false });
  }

  function handleMaterialFilter(materialId) {
    setMaterialFilter(materialId);

    const filtered = toBeFiltered().filter(
      (product) =>
        product.materialId === materialId &&
        (!colorFilter || product.colorId === colorFilter)
    );
    dispatch({ type: DATA, payload: { ...state.data, filtered: filtered } });
    dispatch({ type: RESET_FILTERS, payload: false });
  }

  function handleAll(filterType) {
    let filteredProducts;

    if (filterType === "color") {
      setColorFilter(null);
      filteredProducts = applyMaterialFilter(toBeFiltered(), materialFilter);
    } else {
      setMaterialFilter(null);
      filteredProducts = applyColorFilter(toBeFiltered(), colorFilter);
    }

    dispatch({
      type: DATA,
      payload: { ...state.data, filtered: filteredProducts },
    });
  }

  function applyMaterialFilter(products, materialFilter) {
    return materialFilter
      ? products.filter((product) => product.materialId === materialFilter)
      : products;
  }

  function applyColorFilter(products, colorFilter) {
    return colorFilter
      ? products.filter((product) => product.colorId === colorFilter)
      : products;
  }

  const productPerPage = 6;
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
              !materialFilter || state.resetFilters
                ? "list list_active"
                : "list"
            }
            onClick={() => handleAll("material")}
          >
            All
          </p>
          {state.data.materials?.map((material) => {
            return (
              <p
                onClick={() => handleMaterialFilter(material.id)}
                key={material.id}
                className={
                  material.id === materialFilter && !state.resetFilters
                    ? "list list_active"
                    : "list"
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
              !colorFilter || state.resetFilters ? "list list_active" : "list"
            }
            onClick={() => handleAll("color")}
          >
            All
          </p>
          {state.data.colors?.map((color) => {
            return (
              <p
                onClick={() => handleColorFilter(color.id)}
                key={color.id}
                className={
                  color.id === colorFilter && !state.resetFilters
                    ? "list list_active"
                    : "list"
                }
              >
                {color.name}
              </p>
            );
          })}
        </div>
      </section>
      <section className="right">
        <div ref={mainref} className="products_container">
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
