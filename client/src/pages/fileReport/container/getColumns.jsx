import { DocumentChartBarIcon, TrashIcon } from "@heroicons/react/24/solid";

export const getColumns = (handleView, handleDelete) => [
  {
    Header: 'File Name',
    accessor: 'fileName',
    width: '200px',
    disableSortBy: true,
  },
  {
    Header: 'User Name',
    accessor: 'userName',
    width: '125px',
    disableSortBy: true,
  },
  {
    Header: 'File Size',
    accessor: 'fileSize',
    width: '125px',
    disableSortBy: true,
  },
  {
    Header: 'Start Time',
    accessor: 'startTime',
    width: '100px',
    disableSortBy: true,
  },
  {
    Header: 'End Time',
    accessor: 'endTime',
    width: '100px',
    disableSortBy: true,
  },
  {
    Header: 'Total Entries',
    accessor: 'totalEntries',
    disableSortBy: true,
  },
  {
    Header: 'Successfull',
    accessor: 'successfulEntries',
    disableSortBy: true,
  },
  {
    Header: 'Failed',
    accessor: 'failedEntries',
    disableSortBy: true,
  },
  {
    Header: 'Log',
    accessor: '',
    disableSortBy: true,
    Cell: ({ row }) => (
      <div className="flex gap-2">
        <DocumentChartBarIcon className="text-gray-500 hover:text-blue-700 size-9 cursor-pointer" onClick={() => handleView(row)} />
        <TrashIcon className="text-gray-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete(row)} />
      </div>
    ),
  },
]
