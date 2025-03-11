import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../Components/Country.css";

const Country = () => {
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [error, setError] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    if (!name) return;

    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(
            name
          )}?fullText=true`
        );
        if (!response.ok) throw new Error("Country not found");

        const data = await response.json();
        const countryData = data[0];
        setCountry(countryData);

        console.log("Fetched Country Data:", countryData);

        if (countryData.borders && countryData.borders.length > 0) {
          console.log("Border Codes:", countryData.borders);
          fetchBorderCountries(countryData.borders);
        } else {
          console.log("No Borders Found");
          setBorderCountries([]);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCountryData();
  }, [name]);

  const fetchBorderCountries = async (borderCodes) => {
    try {
      if (!borderCodes || borderCodes.length === 0) return;
      console.log("Fetching border countries for:", borderCodes);

      const response = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`
      );
      if (!response.ok) throw new Error("Failed to fetch border countries");

      const data = await response.json();
      console.log("Fetched Border Countries:", data);

      setBorderCountries(data.map((c) => c.name.common));
    } catch (error) {
      console.error("Error fetching border countries:", error);
    }
  };

  if (error) return <h3>Error: {error}</h3>;
  if (!country) return <h3>Loading country data...</h3>;

  return (
    <>
      <Link to="/" className="btn btn-light">
        <i className="fas fa-arrow-left"></i> Back Home
      </Link>

      <section className="country">
        <article>
          <div className="flag">
            <h1>{country.name.common}</h1>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
          </div>
          <div className="country-details">
            <h2>{country.name.common}</h2>
            <h5>
              Native Name:{" "}
              <span>
                {country.name.nativeName
                  ? Object.values(country.name.nativeName)[0].common
                  : "N/A"}
              </span>
            </h5>
            <h5>
              Population: <span>{country.population.toLocaleString()}</span>
            </h5>
            <h5>
              Region: <span>{country.region}</span>
            </h5>
            <h5>
              Sub Region: <span>{country.subregion}</span>
            </h5>
            <h5>
              Capital: <span>{country.capital?.[0] || "N/A"}</span>
            </h5>
            <h5>
              Top Level Domain: <span>{country.tld?.join(", ") || "N/A"}</span>
            </h5>
            <h5>
              Currencies:{" "}
              <span>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((cur) => cur.name)
                      .join(", ")
                  : "N/A"}
              </span>
            </h5>
            <h5>
              Languages:{" "}
              <span>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </span>
            </h5>
          </div>

          {/* Borders Section */}
          {borderCountries.length > 0 ? (
            <div className="borders-container">
              <h5>Border Countries:</h5>
              <div className="borders">
                {borderCountries.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className="border-link"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <h5>No bordering countries</h5>
          )}
        </article>
      </section>
    </>
  );
};

export default Country;
