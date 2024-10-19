"use client";

import { useState, useEffect, useRef } from "react";
import { AiOutlineFilter } from "react-icons/ai";

export default function Filter({ filters, setFilters }) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);
    const buttonRef = useRef(null); // Ref for the button to anchor the popover

    const togglePopover = () => setIsOpen((prev) => !prev);

    const handleFilterChange = (filter) => {
        setFilters((prev) => ({
            ...prev,
            [filter]: !prev[filter],
        }));
    };

    const clearFilters = () => {
        setFilters({ completed: false, high: false, medium: false, low: false });
        setIsOpen(false); // Close the popover after clearing filters
    };

    // Close the popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                popoverRef.current &&
                !popoverRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block">
            <button
                ref={buttonRef} // Attach the ref to the button
                onClick={togglePopover}
                aria-haspopup="true"
                aria-expanded={isOpen}
                className="flex items-center relative"
            >
                <AiOutlineFilter size={25} className="text-lg font-semibold" />
                {Object.values(filters).some((value) => value) && (
                    <span className="w-2 h-2 absolute top-0 right-0 bg-blue-500 rounded-full" />
                )}
            </button>

            {isOpen && (
                <div
                    ref={popoverRef}
                    className={`absolute top-6 ${window.innerWidth < 640 ? 'right-0' : 'left-0'} bg-white border border-gray-300 rounded shadow-lg mt-2 p-4 z-10 w-48`}
                >
                    <h2 className="font-semibold mb-2 text-gray-800">Filter Tasks</h2>
                    <div className="flex flex-col space-y-3">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.high}
                                onChange={() => handleFilterChange("high")}
                                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">High Priority</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.medium}
                                onChange={() => handleFilterChange("medium")}
                                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">Medium Priority</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.low}
                                onChange={() => handleFilterChange("low")}
                                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">Low Priority</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.completed}
                                onChange={() => handleFilterChange("completed")}
                                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">Completed</span>
                        </label>
                    </div>
                    <div className="flex justify-end w-full gap-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 w-18 text-red-400 border-2 rounded-lg border-red-400 p-1 text-sm"
                        >
                            Close
                        </button>
                        <button
                            onClick={clearFilters}
                            className="mt-4 w-18 text-blue-500 border-2 rounded-lg border-blue-500 p-1 text-sm"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
