import React from "react";
import "./Pagination.scss";

function Pagination({ products, produtsPerPage, setCurrentPage, currentPage }) {
  const pages = [];
  const totalProducts = products.length;

  for (let i = 1; i < Math.ceil(totalProducts / produtsPerPage) + 1; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.length &&
        pages.map((page, index) => {
          return (
            <button
              className={
                page === currentPage
                  ? "active_page pagination_element"
                  : "pagination_element"
              }
              onClick={() => setCurrentPage(page)}
              key={page}
            >
              {page}
            </button>
          );
        })}
    </div>
  );
}

export default Pagination;
