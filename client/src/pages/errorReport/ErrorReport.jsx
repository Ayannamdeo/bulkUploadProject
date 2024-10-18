import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getColumns } from "./container/getColumns";
import { TableComponent, PaginationNav, PageSizeMenu } from "../../components";
import { getErrorReportData } from "../../services/errorReport";

const ErrorReportTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { logId } = useParams();

  const columns = useMemo(() => getColumns(), []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPageIndex(0); // Reset to the first page when page size changes
  }, []);

  const gotoPage = useCallback((pageIndex) => {
    setPageIndex(pageIndex);
  }, []);

  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["errorreports", pageIndex, pageSize],
    queryFn: () =>
      getErrorReportData({ page: pageIndex + 1, size: pageSize, logId }),
    retry: false,
    keepPreviousData: true,
  });
  useEffect(() => {
    refetch();
  }, [pageIndex, pageSize, refetch]);

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <TableComponent columns={columns} data={fetchedData.errorReport} />
          <div className="flex justify-between">
            <PageSizeMenu
              className="sm:w-32 mr-2"
              pageSize={pageSize}
              handlePageSizeChange={handlePageSizeChange}
              options={[
                { id: 10, caption: "10 rows" },
                { id: 20, caption: "20 rows" },
                { id: 50, caption: "50 rows" },
              ]}
            />
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

const ErrorReport = () => {
  return (
    <div className="grid max-w-screen-xl justify-center items-center  overflow-auto my-4 py-4 sm:py-0">
      <ErrorReportTable />
    </div>
  );
};

const MemoizedErrorReport = React.memo(ErrorReport);

export { MemoizedErrorReport as ErrorReport };
