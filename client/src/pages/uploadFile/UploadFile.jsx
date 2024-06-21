import { MainLayout } from "../../layouts/MainLayout";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const UploadFile = () => {
	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleFileUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("csvfile", file);

		try {
			const response = await axios.post("http://localhost:3000/api/financials/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
			toast.success("File uploaded successfully!");
		} catch (error) {
			console.error("Error uploading file:", error);
			toast.error("Failed to upload file.");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded shadow-md w-96">
				<h2 className="text-2xl font-semibold mb-4">Upload CSV File</h2>
				<form onSubmit={handleFileUpload}>
					<input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
					<button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-500 transition-colors duration-300">
						Upload
					</button>
				</form>
			</div>
		</div>
	);
};
