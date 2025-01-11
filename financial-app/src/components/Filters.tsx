import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minRevenue: "",
    maxRevenue: "",
    minNetIncome: "",
    maxNetIncome: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div>
        <label className="block">Date Range</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="border px-2 py-1"
        />
      </div>
      <div>
        <label className="block">Revenue Range</label>
        <input
          type="number"
          name="minRevenue"
          value={filters.minRevenue}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="maxRevenue"
          value={filters.maxRevenue}
          onChange={handleChange}
          className="border px-2 py-1"
        />
      </div>
      <div>
        <label className="block">Net Income Range</label>
        <input
          type="number"
          name="minNetIncome"
          value={filters.minNetIncome}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="maxNetIncome"
          value={filters.maxNetIncome}
          onChange={handleChange}
          className="border px-2 py-1"
        />
      </div>
      <button
        onClick={handleApplyFilters}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
