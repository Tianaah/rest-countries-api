import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ Import Link

const Country = () => {
  const [country, setCountry] = useState([]); // ✅ Ensure the initial state is an array
  const { name } = useParams();
  const [error, setError] = useState(null);

  console.log("Country Name from URL:", name);

  useEffect(() => {
    if (!name) return;

    const fetchCountryData = async () => {
      try {
        console.log("Fetching country data for:", name);

        const response = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
        ); // ✅ Fix: Await fetch

        console.log("API Response:", response);

        if (!response.ok) throw new Error("Country not found");

        const data = await response.json();
        console.log("Fetched Data:", data);
        setCountry(data); // ✅ Fix: Store data correctly
      } catch (error) {
        console.error("Error fetching country data:", error);
        setError(error.message);
      }
    };

    fetchCountryData();
  }, [name]);

  if (error) return <h3>Error: {error}</h3>; // ✅ Display error message if API fails
  if (country.length === 0) return <h3>Loading country data...</h3>; // ✅ Handle empty state

  return (
    <>
      <Link to="/" className="btn btn-light">
        <i className="fas fa-arrow-left"></i> Back Home
      </Link>

      <section className="country">
        {country.map((c) => (
          <article key={c.cca3}>
            <div className="flag">
              <h1>{c.name.common}</h1> {/* ✅ Fix: Use `c.name.common` */}
              <img src={c.flags.png} alt={`Flag of ${c.name.common}`} />
            </div>
            <div className="country-details">
              <h2>{c.name.common}</h2>
              <h5>
                Native Name:{" "}
                <span>
                  {c.name.nativeName
                    ? Object.values(c.name.nativeName)[0].common
                    : "N/A"}
                </span>
              </h5>
              <h5>
                Population: <span>{c.population.toLocaleString()}</span>
              </h5>
              <h5>
                Region: <span>{c.region}</span>
              </h5>
              <h5>
                Sub Region: <span>{c.subregion}</span>
              </h5>
              <h5>
                Capital: <span>{c.capital?.[0] || "N/A"}</span>
              </h5>
              <h5>
                Top Level Domain: <span>{c.tld?.join(", ") || "N/A"}</span>
              </h5>
              <h5>
                Currencies:{" "}
                <span>
                  {c.currencies
                    ? Object.values(c.currencies)
                        .map((cur) => cur.name)
                        .join(", ")
                    : "N/A"}
                </span>
              </h5>
              <h5>
                Languages:{" "}
                <span>
                  {c.languages ? Object.values(c.languages).join(", ") : "N/A"}
                </span>
              </h5>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default Country;
