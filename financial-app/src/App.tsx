import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/filtered-data";



const App = () => {
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data.data); 
        setFilteredData(response.data.data); 
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  }, []);

  
  const handleFilter = (filters) => {
    const { startDate, endDate, minRevenue, maxRevenue } = filters;

    const filtered = data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        (!startDate || itemDate >= new Date(startDate)) &&
        (!endDate || itemDate <= new Date(endDate)) &&
        (!minRevenue || item.revenue >= parseFloat(minRevenue)) &&
        (!maxRevenue || item.revenue <= parseFloat(maxRevenue))
      );
    });
    setFilteredData(filtered);
  };

  const handleClear = () => {
    setFilteredData(data); 
    
    const form = document.getElementById("filterForm") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  

  return (
    <div>
      <header>
        <h1>Financial Data Filtering App</h1>
      </header>
      <main className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            {}
            <form
              id="filterForm"
              onSubmit={(e) => {
                e.preventDefault();
                const filters = {
                  startDate: e.target.startDate.value,
                  endDate: e.target.endDate.value,
                  minRevenue: e.target.minRevenue.value,
                  maxRevenue: e.target.maxRevenue.value,
                };
                handleFilter(filters);
              }}
            >
              <div className="filter-row">
                <div>
                  <label htmlFor="startDate">Start Date</label>
                  <input type="date" id="startDate" name="startDate" />
                </div>
                <div>
                  <label htmlFor="endDate">End Date</label>
                  <input type="date" id="endDate" name="endDate" />
                </div>
                <div>
                  <label htmlFor="minRevenue">Min Revenue</label>
                  <input type="number" id="minRevenue" name="minRevenue" />
                </div>
                <div>
                  <label htmlFor="maxRevenue">Max Revenue</label>
                  <input type="number" id="maxRevenue" name="maxRevenue" />
                </div>
              </div>
              <div className="button-row">
                <button type="submit" className="apply-button">
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="clear-button"
                  onClick={handleClear}
                >
                  Clear Filters
                </button>
              </div>
            </form>

            {}
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Revenue</th>
                  <th>Net Income</th>
                  <th>Gross Profit</th>
                  <th>EPS</th>
                  <th>Operating Income</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.revenue}</td>
                    <td>{item.netIncome}</td>
                    <td>{item.grossProfit}</td>
                    <td>{item.eps}</td>
                    <td>{item.operatingIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
