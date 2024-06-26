export const EditFinancial = ({ data, onSave, onCancel }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedEntry = { ...data, ...Object.fromEntries(formData.entries()) };
    onSave(updatedEntry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Financial Record</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Update the details of the financial record.</p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
            <input type="text" name="full-name" id="full-name" defaultValue={data.fullName} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
            <select id="country" name="country" defaultValue={data.country} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
              <option value="">Select Country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
            <input type="text" name="city" id="city" defaultValue={data.city} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal Code</label>
            <input type="text" name="postal-code" id="postal-code" defaultValue={data.postalCode} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" onClick={onCancel} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  );
};

