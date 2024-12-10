import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateFinancialData } from "../../../services/financials";

export const EditFinancial = ({ data, onClose }) => {
  const [formData, setFormData] = useState(data);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, updatedData }) => updateFinancialData(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries("financials");
      toast.success("Record Updated Successfully");
      onClose();
    },
    onError: (error) => {
      console.error("Error updating financial record:", error);
      toast.error(`Error updating financial record: ${error}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const id = data._id;
    mutation.mutate({ id, updatedData: formData });
  };

  const filteredFields = Object.keys(formData).filter(
    (key) => !["_id", "__v", "createdAt", "updatedAt"].includes(key),
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-screen max-w-4xl mx-4 sm:mx-auto">
      <h2 className="text-xl font-semibold leading-7 text-gray-900">
        Edit Financial Record
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Edit the information of the selected financial record.
      </p>
      <div className="pb-2 border-b border-gray-900/10 mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        {filteredFields.map((key) => (
          <div className="sm:col-span-1" key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium leading-6 text-gray-900 capitalize"
            >
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <div className="mt-2">
              {key === "transactionDescription" ? (
                <textarea
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          onClick={onClose}
          className="rounded-md bg-blue-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};
