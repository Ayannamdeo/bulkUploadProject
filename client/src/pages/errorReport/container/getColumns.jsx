
export const getColumns = () => [
  {
    Header: 'Row Number',
    accessor: 'rowNumber',
    width: '400px',
    disableSortBy: true,
  },
  {
    Header: 'Error Details',
    accessor: 'errorDetails',
    width: '400px',
    disableSortBy: true,
    Cell: ({ row }) => <div className="whitespace-pre-wrap">{row.errorDetails}</div>,
  },
]
