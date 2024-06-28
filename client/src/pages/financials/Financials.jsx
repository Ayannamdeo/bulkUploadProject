import { useMemo, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { getColumns } from './container/getColumns';
import { GlobalSearch, CurrencyFilter, AccountNameFilter, AddFinancial, EditFinancial, ViewFinancial } from './container';
import { Modal, TableComponent, PageSizeMenu, PaginationNav } from '../../components';
import { getFinancialData, deleteFinancialData } from '../../services/financials';
import useModal from '../../hooks/useModal';

const FinancialsTable = () => {
  const queryClient = useQueryClient();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState({ id: 'createdAt', desc: true }); // Initial sorting by createdAt in descending order
  const [globalFilter, setGlobalFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [accountNameFilter, setAccountNameFilter] = useState('');

  const { selectedRow, isModalOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState(null);

  const handleAdd = () => {
    setModalType('add');
    openModal();
  };

  const handleView = (row) => {
    setModalType('view');
    openModal(row);
  };

  const handleEdit = (row) => {
    setModalType('edit');
    openModal(row);
  };

  const handleDelete = (row) => {
    console.log("Deleting row: ", row);
    deleteMutation.mutate(row._id);
  };

  const columns = useMemo(() => getColumns(handleView, handleEdit, handleDelete), []);

  const { data: fetchedData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['financials', pageIndex, pageSize, sortBy],
    queryFn: () => getFinancialData({
      page: pageIndex + 1, // API pages are usually 1-based
      size: pageSize,
      sortBy: sortBy.id,
      sortDirection: sortBy.desc === null ? null : (sortBy.desc ? 'desc' : 'asc'),
      globalFilter,
      currencyFilter,
      accountNameFilter
    }),
    retry: false,
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteFinancialData(id),
    onSuccess: () => {
      toast.success("Record Deleted Successfully");
      queryClient.invalidateQueries('financials');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error while deleting the record: ${error.message}`);
    },
  });

  useEffect(() => {
    // console.log("useEffect accountNameFilter: ", accountNameFilter);
    refetch();
    console.log("data inside useEffect: ", fetchedData);
  }, [pageIndex, pageSize, sortBy, globalFilter, refetch, currencyFilter, accountNameFilter]);

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
    }
    setSortBy(newSortBy);
    setPageIndex(0); // Reset to the first page when sorting changes
  };

  const handlePageSizeChange = (newPageSize) => {
    // console.log("handlePagesizeChange newPageSize: ", newPageSize);
    setPageSize(newPageSize);
    setPageIndex(0); // Reset to the first page when page size changes
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrencyFilter(newCurrency);
    setPageIndex(0); // Reset to the first page when page size changes
  };

  const handleAccountNameChange = (newAccountName) => {
    setAccountNameFilter(newAccountName);
    setPageIndex(0); // Reset to the first page when page size changes
  };

  const handleGlobalFilterChange = (value) => {
    setGlobalFilter(value);
  };

  const gotoPage = (pageIndex) => {
    setPageIndex(pageIndex);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <GlobalSearch
          className="sm:w-64"
          globalFilter={globalFilter}
          setGlobalFilter={handleGlobalFilterChange}
        />
        <div className='flex gap-4'>

          <AccountNameFilter
            className="sm:w-64"
            accountNameFilter={accountNameFilter}
            handleAccountNameChange={handleAccountNameChange}
            options={[
              { id: "", caption: "All Accounts" }, // Add the "All" option
              { id: "Personal Loan Account", caption: "Personal Loan Account" },
              { id: "Savings Account", caption: "Savings Account" },
              { id: "Credit Card Account", caption: "Credit Card Account" },
              { id: "Investment Account", caption: "Investment Account" },
              { id: "Checking Account", caption: "Checking Account" },
              { id: "Auto Loan Account", caption: "Auto Loan Account" },
              { id: "Home Loan Account", caption: "Home Loan Account" },
              { id: "Money Market Account", caption: "Money Market Account" },
            ]}
          />

          <CurrencyFilter
            className="sm:w-48"
            currencyFilter={currencyFilter}
            handleCurrencyChange={handleCurrencyChange}
            options={[
              { id: "", caption: "All Currency" }, // Add the "All" option
              { id: "Euro", caption: "Euro" },
              { id: "Indian Rupee", caption: "Indian Rupee" },
              { id: "Yen", caption: "Yen" },
              { id: "US Dollar", caption: "US Dollar" },
            ]}
          />
          <button
            onClick={handleAdd}
            className="rounded-md bg-blue-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-gray-400 hover:bg-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-600"
          >
            Add Record
          </button>
        </div>
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

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {modalType === 'add' && <AddFinancial onClose={closeModal} />}
            {modalType === 'edit' && selectedRow && <EditFinancial data={selectedRow} onClose={closeModal} />}
            {modalType === 'view' && selectedRow && <ViewFinancial data={selectedRow} onClose={closeModal} />}
          </Modal>

          <div className="flex justify-between">
            <PageSizeMenu
              className="sm:w-32 mr-2   "
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

export const Financials = () => {
  return (
    <div className=" max-w-screen-xl justify-center items-center  overflow-visible  my-4 py-4 sm:py-0">
      <FinancialsTable />
    </div>
  );
};




