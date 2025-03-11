import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./Components/Countries";
import Header from "./Components/Header";
import Filter from "./Components/Filter";
import Country from "./Components/Country";

const url = "https://restcountries.com/v3.1/all";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountryData();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Filter
                countries={countries}
                setFilteredCountries={setFilteredCountries}
              />
              <Countries countries={filteredCountries} />
            </>
          }
        />
        <Route path="/country/:name" element={<Country />} />
      </Routes>
    </Router>
  );
}

export default App;
