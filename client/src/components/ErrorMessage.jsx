import React from 'react'

export const ErrorMessage = ({ error }) => {
  return (
    <div className=" py-52 px-8 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-bold text-blue-400 mb-6 text-6xl">Error Occurred</h1>
        <p className="text-blue-500 leading-8 mb-10 text-xl">{error.message}</p>
      </div>
    </div>
  );
}


