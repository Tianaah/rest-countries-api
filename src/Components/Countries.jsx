import React, { useState, useEffect } from "react";

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [countries, setCountries] = useState([]);

  const fetchCountryData = async () => {
    const response = await fetch(url);
    const countries = await response.json();
    setCountries(countries);
    console.log(countries);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);
  return (
    <section className="grid">
      {countries.map((country) => {
        const { cca3, name, population, region, capital, flags } = country;

        return (
          <article key={cca3}>
            <div>
              <img src={flags.png} alt={name.common} />
              <div className="details">
                <h3>{name.common}</h3>
                <h4>
                  Population: <span>{population}</span>
                </h4>
                <h4>
                  Region: <span>{region}</span>
                </h4>
                <h4>
                  Capital: <span>{capital ? capital[0] : "N/A"}</span>
                </h4>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Countries;
