import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export const getColumns = (handleView, handleEdit, handleDelete) => [{
	Header: 'Name',
	accessor: 'name',
	width: '250px',
},
{
	Header: 'Age',
	accessor: 'age',
},
{
	Header: 'Account Number',
	accessor: 'accountNumber',
},
{
	Header: 'Account Name',
	accessor: 'accountName',
	width: '200px',
},
{
	Header: 'Amount',
	accessor: 'amount',
},
{
	Header: 'Currency',
	accessor: 'currencyName',
},
{
	Header: 'City',
	accessor: 'city',
	width: '200px',
},
{
	Header: 'Sex',
	accessor: 'sex',
},
{
	Header: 'Actions',
	accessor: 'actions',
	disableSortBy: true,
	Cell: ({ row }) => (
		<div className="flex gap-2">
			<FaEye className="text-gray-500 hover:text-blue-700 cursor-pointer" onClick={() => handleView(row)} />
			<FaEdit className="text-gray-500 hover:text-amber-600 cursor-pointer" onClick={() => handleEdit(row)} />
			<FaTrash className="text-gray-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete(row)} />
		</div>
	),
},
]
