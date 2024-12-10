import { useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function PaginationNav({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}) {
  const [inputPage, setInputPage] = useState("");

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageSubmit = (e) => {
    e.preventDefault();
    const pageNumber = Number(inputPage) - 1;
    if (!isNaN(pageNumber) && pageNumber >= 0 && pageNumber < pageCount) {
      gotoPage(pageNumber);
      setInputPage("");
    }
  };
  const renderPageLinks = useCallback(() => {
    const visiblePageButtonCount = 3; // Number of visible pages at the start and end
    const firstellipsis = <li key="ellipsis">...</li>;
    const lastellipsis = <li key="last-ellipsis">...</li>;
    const pages = [];

    if (pageCount === 0) return null;
    if (pageCount === 1) {
      pages.push(
        <li key={0}>
          <Button2
            content={1}
            onClick={() => gotoPage(0)}
            active={pageIndex === 0}
          />
        </li>
      );
      return pages;
    }

    // Show the first page
    pages.push(
      <li key={0}>
        <Button2
          content={1}
          onClick={() => gotoPage(0)}
          active={pageIndex === 0}
        />
      </li>
    );

    // Show ellipsis if needed
    if (pageIndex + 1 > visiblePageButtonCount) {
      pages.push(firstellipsis);
    }

    // Calculate start and end pages
    const startPage = Math.max(1, pageIndex - 1);
    const endPage = Math.min(pageCount - 2, pageIndex + 1);

    // Add pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i}>
          <Button2
            content={i + 1}
            onClick={() => gotoPage(i)}
            active={pageIndex === i}
          />
        </li>
      );
    }

    // Show ellipsis if needed
    if (pageIndex < pageCount - visiblePageButtonCount - 1) {
      pages.push(lastellipsis);
    }

    // Show the last page
    pages.push(
      <li key={pageCount - 1}>
        <Button2
          content={pageCount}
          onClick={() => gotoPage(pageCount - 1)}
          active={pageIndex === pageCount - 1}
        />
      </li>
    );

    return pages;
  }, [pageCount, pageIndex, gotoPage]);

  return (
    <div className="flex items-center gap-2">
      <ul className="flex gap-2  mr-64">
        <li>
          <Button2
            content={
              <div className="flex ml-1">
                <FaChevronLeft size="0.6rem" />
                <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
              </div>
            }
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          />
        </li>
        {renderPageLinks()}
        <li>
          <Button2
            content={
              <div className="flex ml-1">
                <FaChevronRight size="0.6rem" />
                <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
              </div>
            }
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          />
        </li>
      </ul>
      <form onSubmit={handlePageSubmit} className="flex items-center ml-10 gap-2">
        <input
          type="number"
          min="1"
          max={pageCount}
          value={inputPage}
          onChange={handleInputChange}
          className="w-20 p-2 border border-gray-300 rounded-lg"
          placeholder="Page"
        />
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal bg-white text-blue-gray-500 hover:bg-gray-300 hover:text-white"
        >
          Go
        </button>
      </form>
    </div>
  );
}

function Button2({ content, onClick, active, disabled }) {
  return (
    <button className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors
        ${active ? "bg-blue-gray-500 text-white" : "bg-white text-blue-gray-500 hover:bg-gray-300 hover:text-white"}
        ${!disabled ? "" : " text-gray-300 cursor-not-allowed"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

