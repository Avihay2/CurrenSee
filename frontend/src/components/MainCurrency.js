import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import "../styles/MainCurrency.css";
import {
  updateMainAmount,
  updateMainCountry,
  updateMainFav,
  updateRateList,
} from "../actions";
import Dropdown from "./Dropdown";
import StarIcon from "./icons/StarIcon";

const MainCurrency = ({
  initialCurrency,
  mainAmount,
  currencies,
  username,
  favorites,
}) => {
  const dispatch = useDispatch();

  const [currentCurrency, setCurrentCurrency] = useState(initialCurrency);
  const [icon, setIcon] = useState(false);
  const [symbol, setSymbol] = useState("");

  const handleIcon = () => {
    dispatch(updateMainFav(icon ? "" : currentCurrency, username));
    setIcon(!icon);
  };

  const updateCurrentCurrency = (code) => {
    setCurrentCurrency(code);
  };

  const changeSymbol = (newSymbol) => {
    setSymbol(newSymbol);
  };

  const handleAmount = (e) => {
    dispatch(updateMainAmount(e.target.value));
  };

  
  useEffect(() => {
    const fetchRatesData = async () => {
      const newRatesList = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_API_KEY}/latest/${currentCurrency}`
      );
      dispatch(updateRateList(newRatesList.data.conversion_rates));
    };
    
    fetchRatesData();
    dispatch(updateMainCountry(currencies[currentCurrency].motherCountry));
    setIcon(favorites.main === currentCurrency ? true : false);
  }, [currentCurrency]);
  

  useEffect(() => {
    if (mainAmount === "") {
      dispatch(updateMainAmount("1"));
    }
  }, [mainAmount]);

  return (
    <div className="select-currency-container">
      <div className="star-icon" onClick={handleIcon}>
        <StarIcon isFill={icon} />
      </div>

      <Dropdown
        currencies={currencies}
        changeSymbol={changeSymbol}
        currentCurrency={currentCurrency}
        updateCurrentCurrency={updateCurrentCurrency}
      />

      <span className="separate-line"></span>

      <div className="amount-container">
        <input
          className="amount-input"
          style={{ maxWidth: `${10 + mainAmount.length * 7.5}px` }}
          value={mainAmount}
          onChange={handleAmount}
        ></input>
        <span className="currency-symbol">{symbol}</span>
      </div>
    </div>
  );
};

export default MainCurrency;
