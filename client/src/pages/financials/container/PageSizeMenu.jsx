import { useMemo, Fragment } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { Listbox, Transition } from "@headlessui/react";

export function PageSizeMenu({ pageSize, handlePageSizeChange, options, className = "", disabled }) {
  const selectedOption = useMemo(() => options.find((o) => o.id === pageSize), [options, pageSize]);

  return (
    <Listbox value={pageSize} onChange={handlePageSizeChange} disabled={disabled}>
      <div className={`relative w-full ${className}`}>
        <Listbox.Button
          className={`relative w-full rounded-xl py-3 pl-3 pr-10 text-base text-gray-700 text-left shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none
          ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white cursor-default"}
          `}
        >
          <span className="block truncate">{selectedOption?.caption}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FaChevronDown size="0.80rem" className="text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white text-base shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) => `relative cursor-default select-none py-3 pl-10 pr-4 ${active ? "bg-blue-gray-100" : ""}`}
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {option.caption}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-gray-600">
                        <FaCheck size="0.5rem" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

