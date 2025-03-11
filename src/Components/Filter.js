import React, { useState } from "react";

const Filter = ({ countries, setFilteredCountries }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const filterCountries = (search = searchTerm, region = selectedRegion) => {
    let filtered = countries;

    if (search) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region && region !== "Filter by region") {
      filtered = filtered.filter((country) => country.region === region);
    }

    setFilteredCountries(filtered);
  };

  return (
    <section className="filter">
      <form className="form-control" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            filterCountries(e.target.value, selectedRegion);
          }}
        />
      </form>

      <div className="region-filter">
        <select
          className="select"
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value);
            filterCountries(searchTerm, e.target.value);
          }}
        >
          <option value="">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
