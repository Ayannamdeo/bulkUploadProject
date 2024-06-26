import { useMemo, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

import { getColumns } from './container/getColumns';
import { TableComponent, PaginationNav, PageSizeMenu } from '../../components';
import { getFileReportData } from '../../services/fileReport';

const FileReportTable = () => {
	// const queryClient = useQueryClient();

	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const navigate = useNavigate();

	const handleDelete = (row) => {
		console.log("Deleting row: ", row);
		// deleteMutation.mutate(row._id);
	};
	const handleView = (row) => {
		console.log("viewing row: ", row);
		const logId = row.uploadId;
		navigate(`/errorreport/${logId}`);
	};

	const columns = useMemo(() => getColumns(handleView, handleDelete), []);

	const { data: fetchedData, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['filereports', pageIndex, pageSize],
		queryFn: () => getFileReportData({ page: pageIndex + 1, size: pageSize, }),
		retry: false,
		keepPreviousData: true,
	});
	//
	// const deleteMutation = useMutation({
	// 	mutationFn: (id) => deleteFinancialData(id),
	// 	onSuccess: () => {
	// 		toast.success("Record Deleted Successfully");
	// 		queryClient.invalidateQueries('financials');
	// 	},
	// 	onError: (error) => {
	// 		toast.error(`Error while deleting the record: ${error.message}`);
	// 	},
	// });
	//
	useEffect(() => {
		refetch();
		// console.log("data inside useEffect: ", fetchedData);
	}, [pageIndex, pageSize, refetch,]);


	const handlePageSizeChange = (newPageSize) => {
		// console.log("handlePagesizeChange newPageSize: ", newPageSize);
		setPageSize(newPageSize);
		setPageIndex(0); // Reset to the first page when page size changes
	};

	const gotoPage = (pageIndex) => {
		setPageIndex(pageIndex);
	};

	return (
		<div className="flex flex-col gap-4">

			{isLoading ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {error.message}</div>
			) : (
				<>
					<TableComponent
						columns={columns}
						data={fetchedData.fileReport}
					/>
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

export const FileReport = () => {
	return (
		<div className="grid max-w-screen-xl justify-center items-center  overflow-auto my-4 py-4 sm:py-0">
			<FileReportTable />
		</div>
	);
};

