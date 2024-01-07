// components react
import React from "react";

// components react boorstrap
import { Button } from "react-bootstrap";

// scss
import "./Paginations.scss";
// -----------------------------------

function Paginations({
  dataTransaction,
  currentPage,
  dataPerPage,
  handlePageClick,
  handleNextPage,
  handlePrevPage,
}) {
  const pageNumberLimit = 3;
  const maxPageNumberLimit = currentPage + Math.floor(pageNumberLimit / 2);
  const minPageNumberLimit = maxPageNumberLimit - pageNumberLimit + 1;

  const pages = [];
  for (let i = 1; i <= Math.ceil(dataTransaction.length / dataPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={() => handlePageClick(number)}
          className={
            currentPage === number ? "active page-link" : "page-link"
          }
        >
          {number}
        </li>
      );
    } else if (
      (number === minPageNumberLimit - 1 && number !== 1) ||
      (number === maxPageNumberLimit + 1 && number !== pages.length)
    ) {
      return (
        <li key={number} className="page-link">
          ...
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <nav className="pagination">
      <ul>
        <li className="btn-prev">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </Button>
        </li>

        {renderPageNumbers}

        <li className="btn-next">
          <Button
            onClick={handleNextPage}
            disabled={currentPage === pages.length}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Paginations;
