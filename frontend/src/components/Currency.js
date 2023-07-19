import { useState, useEffect } from "react";
import axios from "axios";

import "../styles/Currency.css";
import { getCurrencyCountry } from "../handle";

const Currency = ({ currencyIsoCode, clicked, changeSymbol }) => {
  const [err, setErr] = useState(false);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `https://restcountries.com/v3.1/currency/${currencyIsoCode}`
        );
        const data = resp.data;
        setCountry(getCurrencyCountry(data, currencyIsoCode));
        setErr(false);
      } catch (error) {
        setErr(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (country && clicked && changeSymbol) {
      changeSymbol(country.currencies[currencyIsoCode].symbol);
    }
  }, [country, clicked, changeSymbol]);

  if (err) {
    return <p>Error</p>;
  } else if (!country) {
    return (
      <div className="currency-container">
        <p>Loading...</p>
      </div>
    );
  } else {
    if (currencyIsoCode === "EUR") {
      return (
        <div className="currency-container">
          <div className="flag-container">
            <span
              className="fi fi-eu fis"
              title={"Flag of the European Union"}
            ></span>
          </div>

          <span className="cur-acronyms">
            {currencyIsoCode}
          </span>
          
          <span className="cur-name">
            {"Euro"}
          </span>
        </div>
      );
    } else {
      return (
        <div className="currency-container">
          <div className="flag-container">
            <span
              className={`fi fi-${country?.cca2.toLowerCase()} fis`}
              title={country?.flags.alt}
            ></span>
          </div>

          <span className="cur-acronyms">
            {currencyIsoCode}
          </span>

          <span className="cur-name">
            {country?.currencies?.[currencyIsoCode]?.name}
          </span>
        </div>
      );
    }
  }
};

export default Currency;
