import React from "react";

const Pagination = ({ onPageChange, currentPage, pages }) => {
  return (
    <nav>
      <ul className="pagination">
        {pages.map(
          (page) =>
            page !== 0 && (
              <li
                className={`page-item ${currentPage === page && "active"}`}
                key={page}
              >
                <p className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </p>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
