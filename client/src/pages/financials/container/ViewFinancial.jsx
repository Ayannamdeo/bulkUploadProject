export const ViewFinancial = ({ data, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-4 sm:mx-auto">
      <h2 className="text-xl font-semibold leading-7 text-gray-900">View Financial Record</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Detailed information of the selected financial record.</p>
      <div className="pb-2 border-b border-gray-900/10 mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
          <p className="mt-2">{data.name}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Age</label>
          <p className="mt-2">{data.age}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Sex</label>
          <p className="mt-2">{data.sex}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Country</label>
          <p className="mt-2">{data.country}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">City</label>
          <p className="mt-2">{data.city}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Account Number</label>
          <p className="mt-2">{data.accountNumber}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Account Name</label>
          <p className="mt-2">{data.accountName}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
          <p className="mt-2">{data.amount}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Currency Name</label>
          <p className="mt-2">{data.currencyName}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Job Title</label>
          <p className="mt-2">{data.jobTitle}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
          <p className="mt-2">{data.phoneNumber}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Company Name</label>
          <p className="mt-2">{data.companyName}</p>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">Transaction Description</label>
          <p className="mt-2">{data.transactionDescription}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          onClick={onClose}
          className="rounded-md bg-blue-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

