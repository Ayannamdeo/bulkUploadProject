import { FaSortUp, FaSortDown } from "react-icons/fa";

export function TableComponent({ columns, data, sortBy, onSortChange, }) {
  console.log("inside tableComponent columns: ", columns);
  console.log("inside tableComponent data: ", data);
  // console.log("inside tableComponent onSortChange: ", onSortChange);
  return (
    <div className="w-full min-w-[30rem] p-4 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
      <table>
        <thead >
          <tr className="">
            {columns.map((column) => (
              <th
                key={column.accessor}
                onClick={() => !column.disableSortBy && onSortChange(column.accessor)}
                className={`px-3 text-start text-xs font-bold uppercase cursor-pointer hover:bg-gray-100 hover:rounded-lg ${column.disableSortBy ? '' : 'sorting'}`}
                style={{ width: column.width }}
              >
                <div className="flex gap-2 items-center">
                  <div className="text-gray-600">{column.Header}</div>
                  {!column.disableSortBy && (
                    <div className="flex flex-col">
                      {sortBy.id === column.accessor && (
                        <>
                          <FaSortUp className={`text-sm translate-y-1/2 ${!sortBy.desc ? "text-blue-gray-500" : "text-gray-300"}`} />
                          <FaSortDown className={`text-sm -translate-y-1/2 ${sortBy.desc ? "text-blue-gray-500" : "text-gray-300"}`} />
                        </>
                      )}
                      {sortBy.id !== column.accessor && (
                        <>
                          <FaSortUp className="text-sm translate-y-1/2 text-gray-300" />
                          <FaSortDown className="text-sm -translate-y-1/2 text-gray-300" />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {columns.map((column) => (
                  <td
                    key={`${index}-${column.accessor}`}
                    className="p-2 text-sm font-normal text-gray-700 first:rounded-l-lg last:rounded-r-lg"
                  >
                    {column.Cell ? column.Cell({ row }) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-3 text-center text-sm font-normal text-gray-700">
                No data present
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

