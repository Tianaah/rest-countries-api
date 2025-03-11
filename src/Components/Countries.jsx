import React from "react";
import { Link } from "react-router-dom";

const Countries = ({ countries }) => {
  return (
    <section className="grid">
      {countries.length > 0 ? (
        countries.map((country) => {
          const { cca3, name, population, region, capital, flags } = country;

          return (
            <article key={cca3}>
              <div>
                <img src={flags.png} alt={name.common} />
                <div className="details">
                  <h3>{name.common}</h3>
                  <h4>
                    Population: <span>{population.toLocaleString()}</span>
                  </h4>
                  <h4>
                    Region: <span>{region}</span>
                  </h4>
                  <h4>
                    Capital: <span>{capital ? capital[0] : "N/A"}</span>
                  </h4>
                  <Link to={`/country/${name.common}`}>Learn More</Link>
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <p>No countries found</p>
      )}
    </section>
  );
};

export default Countries;
