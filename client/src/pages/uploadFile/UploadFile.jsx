import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

import { uploadFile } from "../../services/uploadFile";
import { PhotoIcon } from "@heroicons/react/24/solid"; // Replace with your icon component
import { Mycontext } from "../../store/CreateContext";

export const UploadFile = () => {
	const [file, setFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const { userEmail } = useContext(Mycontext)
	console.log("userName in uploadFile", userEmail);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleFileUpload = async (e) => {
		e.preventDefault();
		if (!file) {
			toast.error("Please select a file to upload.");
			return;
		}

		setIsUploading(true);
		const formData = new FormData();
		formData.append("csvfile", file);

		try {
			const response = await uploadFile(formData, userEmail);
			if (response.message === "CSV data uploaded and saved to MongoDB successfully") {
				toast.success("File uploaded successfully!");
			}
		} catch (error) {
			console.error("Error uploading file:", error);
			toast.error("Failed to upload file.");
		} finally {
			setIsUploading(false);
			setFile(null); // Reset file input
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded shadow-md w-96">
				<h2 className="text-2xl font-semibold mb-4">Upload CSV File</h2>
				<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
					<div className="text-center">
						<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
						<div className="mt-4 flex text-sm leading-6 text-gray-600">
							<label
								htmlFor="file-upload"
								className={`relative cursor-pointer rounded-md bg-white font-semibold text-blue-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-gray-600 focus-within:ring-offset-2 hover:text-blue-gray-500 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
							>
								<span>Upload a file</span>
								<input id="file-upload" name="file-upload" type="file" accept=".csv" onChange={handleFileChange} className="sr-only" disabled={isUploading} />
							</label>
							<p className="pl-1">or drag and drop</p>
						</div>
						{file ? (<p className="text-xs leading-5 text-gray-600 mt-2 truncate"> Selected file: {file.name} </p>) : <p className="text-xs leading-5 text-gray-600">CSV Files Only</p>
						}
					</div>
				</div>
				<button
					onClick={handleFileUpload}
					className={`mt-4 bg-blue-gray-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-gray-500 transition-colors duration-300 w-full ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
					disabled={isUploading}
				>
					{isUploading ? "Uploading..." : "Upload"}
				</button>
			</div>
		</div>
	);
};
