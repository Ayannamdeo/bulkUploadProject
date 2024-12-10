import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Gridify</h1>
      <p className="text-lg text-gray-700">
        Easily upload, validate, and manage your data with our seamless CSV
        handling platform.
      </p>
      <p className="text-md mt-4 text-gray-600">
        Ready to get started? Upload your CSV files and view detailed records
        with advanced sorting, filtering, and editing options.
      </p>
      <div className="mt-6">
        <button
          onClick={() => navigate("/uploadfile")}
          className="bg-blue-gray-700 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-gray-600"
        >
          Get Started with CSV Upload
        </button>
      </div>
    </div>
  );
}
// export function Hero() {
//   return (
//     <div className="p-8">
//       <h1>Welcome this HomePage</h1>
//     </div>
//   );
// }
