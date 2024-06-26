export const ViewFinancial = ({ data, onClose }) => {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">View Financial Record</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Detailed information of the selected financial record.</p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
          <p className="mt-2">{data.fullName}</p>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">Country</label>
          <p className="mt-2">{data.country}</p>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">City</label>
          <p className="mt-2">{data.city}</p>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal Code</label>
          <p className="mt-2">{data.postalCode}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={onClose} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Close</button>
      </div>
    </div>
  );
};

