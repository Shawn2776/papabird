import React from "react";

export default function PaginationComponent({ setCurrentPage, currentPage }) {
  return (
    <div className="grid grid-cols-2 join">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="join-item btn btn-outline"
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="join-item btn btn-outline"
      >
        Next
      </button>
    </div>
  );
}
