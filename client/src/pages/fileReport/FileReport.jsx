import { useMemo, useEffect, useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { getColumns } from "./container/getColumns";
import { TableComponent, PaginationNav, PageSizeMenu } from "../../components";
import {
  getFileReportData,
  deleteAllFileData,
} from "../../services/fileReport";
import { isAuthenticated } from "../../utils/helpers/auth";

const FileReportTable = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback((row) => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      //redirect user to login page
      toast.error("Please login to perform  this action.");
      navigate("/login");
      return;
    }
    console.log("Deleting row: ", row);
    setIsDeleting(true);
    deleteMutation.mutate(row.uploadId);
  }, []);

  const handleView = useCallback((row) => {
    console.log("viewing row: ", row);
    const logId = row.uploadId;
    navigate(`/errorreport/${logId}`);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPageIndex(0); // Reset to the first page when page size changes
  }, []);

  const gotoPage = useCallback((pageIndex) => {
    setPageIndex(pageIndex);
  }, []);

  const columns = useMemo(() => getColumns(handleView, handleDelete), []);

  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["filereports", pageIndex, pageSize],
    queryFn: () => getFileReportData({ page: pageIndex + 1, size: pageSize }),
    retry: false,
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAllFileData(id),
    onSuccess: () => {
      toast.success("Record Deleted Successfully");
      queryClient.invalidateQueries("financials");
      setIsDeleting(false);
    },
    onError: (error) => {
      toast.error(`Error while deleting the record: ${error.message}`);
      setIsDeleting(false);
    },
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
          <TableComponent columns={columns} data={fetchedData.fileReport} />
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
      {isDeleting && (
        <div className="text-center mt-4 text-gray-600">Deleting...</div>
      )}
    </div>
  );
};

export const FileReport = () => {
  return (
    <div className="grid max-w-screen-xl justify-center items-center  overflow-auto my-4 py-4 sm:py-0">
      <FileReportTable />
    </div>
  );
};
