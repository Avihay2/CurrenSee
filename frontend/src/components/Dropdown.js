import { useState, useEffect, useRef } from "react";

import "../styles/Dropdown.css";
import { searchCurrency } from "../handle";
import Currency from "./Currency";

const Dropdown = ({
  currencies,
  changeSymbol,
  currentCurrency,
  updateCurrentCurrency,
}) => {
  const dropdownRef = useRef(null);
  
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const currenciesKeys = Object.keys(currencies);

  const openDropdown = () => {
    setShow(true);
  };

  const closeDropdown = () => {
    const dropdown = dropdownRef.current;
    dropdown.classList.add("fade-out");
    dropdown.addEventListener(
      "animationend",
      () => {
        setShow(false);
        dropdown.classList.remove("fade-out");
      },
      { once: true }
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCurrencyClick = (code) => {
    updateCurrentCurrency(code);
    closeDropdown();
  };

  useEffect(() => {
    setSearch("");
  }, [show]);

  return (
    <div
      className="dropdown-container"
      onClick={openDropdown}
      onBlur={closeDropdown}
    >
      {show ? (
        <input
          className="currency-input fade-in"
          value={search}
          placeholder="Type to search for currency"
          autoFocus={true}
          onChange={handleSearch}
        ></input>
      ) : (
        <Currency
          currencyIsoCode={currentCurrency}
          clicked={true}
          changeSymbol={changeSymbol}
        />
      )}
      <div
        className={`dropdown ${show ? "fade-in" : ""}`}
        style={{ display: show ? "block" : "none" }}
        ref={dropdownRef}
      >
        <ul>
          {currencies &&
            currenciesKeys?.map((key, index) => {
              const currency = currencies[key];
              let filter = searchCurrency(key, currency, search);

              return (
                <li
                  key={index}
                  style={{ display: filter ? "flex" : "none" }}
                  onClick={() => handleCurrencyClick(key)}
                >
                  <Currency currencyIsoCode={key} clicked={false} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
