import { useMemo, useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getColumns } from './container/getColumns';
import { GlobalSearch, PageSizeMenu, PaginationNav, TableComponent } from './container';
import { getFinancialData } from '../../services/financials';

const FinancialsTable = () => {
  // const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  // const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState({ id: 'createdAt', desc: true }); // Initial sorting by createdAt in descending order
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(getColumns, []);

  const { data: fetchedData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['financials', pageIndex, pageSize, sortBy],
    queryFn: () => getFinancialData({
      page: pageIndex + 1, // API pages are usually 1-based
      size: pageSize,
      sortBy: sortBy.id,
      sortDirection: sortBy.desc === null ? null : (sortBy.desc ? 'desc' : 'asc'),
      globalFilter
    }),
    retry: false,
    keepPreviousData: true,
    // onSuccess: (data) => {
    //   console.log("data after onSuccess: ", data);
    //   setData(data.financials);
    //   setTotalPages(data.totalPages);
    //   console.log("data after setData inside onSuccess: ", data);
    // }
  });

  useEffect(() => {

    console.log("useEffect globalFilter: ", globalFilter);
    refetch();
    console.log("data inside useEffect: ", fetchedData);
  }, [pageIndex, pageSize, sortBy, globalFilter, refetch]);

  const handleSortChange = (columnId) => {
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
    } setSortBy(newSortBy);
    setPageIndex(0); // Reset to the first page when sorting changes
  };

  const handlePageSizeChange = (newPageSize) => {
    console.log("handlePagesizeChange newPageSize: ", newPageSize);
    setPageSize(newPageSize);
    setPageIndex(0); // Reset to the first page when page size changes
  };

  const handleGlobalFilterChange = (value) => {
    setGlobalFilter(value);
  };

  const gotoPage = (pageIndex) => {
    setPageIndex(pageIndex);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <GlobalSearch
          className="sm:w-64"
          globalFilter={globalFilter}
          setGlobalFilter={handleGlobalFilterChange}
        />
        <PageSizeMenu
          className="sm:w-32"
          pageSize={pageSize}
          handlePageSizeChange={handlePageSizeChange}
          options={[
            { id: 10, caption: "10 rows" },
            { id: 20, caption: "20 rows" },
            { id: 50, caption: "50 rows" },
          ]}
        />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <TableComponent
            columns={columns}
            data={fetchedData.financials}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
          <div className="flex justify-center">
            <PaginationNav
              gotoPage={gotoPage}
              canPreviousPage={pageIndex > 0}
              canNextPage={pageIndex < fetchedData.totalPages - 1}
              pageCount={fetchedData.totalPages}
              pageIndex={pageIndex}
            />
          </div>
        </>
      )}
    </div>
  );
};

export const Financials = () => {
  return (
    <div className="grid max-w-screen-xl justify-center items-center  overflow-auto my-4 py-4 sm:py-0">
      <FinancialsTable />
    </div>
  );
};

