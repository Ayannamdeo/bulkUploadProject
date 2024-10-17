import { useCallback, useState } from "react";

const useFinancialsHandler = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState({ id: "createdAt", desc: true }); // Initial sorting by createdAt in descending order
  const [globalFilter, setGlobalFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [accountNameFilter, setAccountNameFilter] = useState("");

  const handleSortChange = useCallback(
    (columnId) => {
      let newSortBy;
      if (sortBy.id === columnId) {
        if (sortBy.desc === null) {
          // Current state is default, move to ascending
          newSortBy = { id: columnId, desc: false };
        } else if (!sortBy.desc) {
          // Current state is ascending, move to descending
          newSortBy = { id: columnId, desc: true };
        } else {
          // Current state is descending, move to default
          newSortBy = { id: null, desc: null };
        }
      } else {
        // Sort by a new column, default to ascending
        newSortBy = { id: columnId, desc: false };
      }
      setSortBy(newSortBy);
      setPageIndex(0); // Reset to the first page when sorting changes
    },
    [sortBy],
  );

  const handlePageSizeChange = useCallback((newPageSize) => {
    // console.log("handlePagesizeChange newPageSize: ", newPageSize);
    setPageSize(newPageSize);
    setPageIndex(0); // Reset to the first page when page size changes
  }, []);

  const handleCurrencyChange = useCallback((newCurrency) => {
    setCurrencyFilter(newCurrency);
    setPageIndex(0); // Reset to the first page when page size changes
  }, []);

  const handleAccountNameChange = useCallback((newAccountName) => {
    setAccountNameFilter(newAccountName);
    setPageIndex(0); // Reset to the first page when page size changes
  }, []);

  const handleGlobalFilterChange = useCallback((value) => {
    setGlobalFilter(value);
  }, []);

  const gotoPage = useCallback((pageIndex) => {
    setPageIndex(pageIndex);
  }, []);

  return {
    handleSortChange,
    handlePageSizeChange,
    handleCurrencyChange,
    handleAccountNameChange,
    handleGlobalFilterChange,
    gotoPage,
    pageIndex,
    pageSize,
    globalFilter,
    currencyFilter,
    accountNameFilter,
    sortBy,
  };
};

export { useFinancialsHandler };
