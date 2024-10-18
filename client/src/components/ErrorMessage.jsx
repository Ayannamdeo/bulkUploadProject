import { Link } from "react-router-dom";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-700 mt-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export { ErrorMessage };
// import React from 'react'
//
// export const ErrorMessage = ({ error }) => {
//   return (
//     <div className=" py-52 px-8 relative overflow-hidden">
//       <div className="max-w-2xl mx-auto text-center">
//         <h1 className="font-bold text-blue-400 mb-6 text-6xl">Error Occurred</h1>
//         <p className="text-blue-500 leading-8 mb-10 text-xl">{error.message}</p>
//       </div>
//     </div>
//   );
// }
