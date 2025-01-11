import React, { useState } from "react";

const Table = ({ data }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
    if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr>
          {["Date", "Revenue", "Net Income", "Gross Profit", "EPS", "Operating Income"].map((col) => (
            <th
              key={col}
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => requestSort(col.toLowerCase().replace(" ", ""))}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index} className="border border-gray-300">
            <td className="px-4 py-2">{item.date}</td>
            <td className="px-4 py-2">{item.revenue}</td>
            <td className="px-4 py-2">{item.netIncome}</td>
            <td className="px-4 py-2">{item.grossProfit}</td>
            <td className="px-4 py-2">{item.eps}</td>
            <td className="px-4 py-2">{item.operatingIncome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
