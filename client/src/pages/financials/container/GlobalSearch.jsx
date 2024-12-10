import { FaSearch, } from "react-icons/fa";
import { useState } from "react";

function InputGroup7({ label, name, value, onChange, onSearch, type = "text", className = "", inputClassName = "", }) {
  return (
    <div
      className={`flex items-stretch w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] ${className}`}
    >
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={label}
        aria-label={label}
        onChange={onChange}
        className={`peer block w-full p-3 text-blue-gray-400 focus:outline-none focus:ring-0 appearance-none  ${inputClassName}`}
      />
      <button onClick={onSearch} className="flex items-center pl-3 pr-3 py-3 text-gray-600 bg-gray-50 hover:bg-gray-200" >
        <FaSearch size="1rem" className="text-gray-400" />
      </button>
    </div>
  );
}
export function GlobalSearch({ globalFilter, setGlobalFilter, className }) {
  const [searchTerm, setSearchTerm] = useState(globalFilter || "");

  const handleSearchClick = () => {
    setGlobalFilter(searchTerm);
  };

  return (
    <InputGroup7
      name="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onSearch={handleSearchClick}
      label="Search"
      className={className}
    />
  );
}

