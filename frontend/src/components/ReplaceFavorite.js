import { useState } from "react";
import { useDispatch } from "react-redux";

import "../styles/ReplaceFavorite.css";
import { updateRelativeFav } from "../actions";
import Currency from "./Currency";

const ReplaceFavorite = ({
  favorites,
  incomingCurrency,
  username,
  closeFunc,
}) => {
  const dispatch = useDispatch();

  const [outGoingCurrency, setoutGoingCurrency] = useState(null);

  const handleCancel = () => {
    setoutGoingCurrency(null);
    closeFunc();
  };

  const handleReplace = () => {
    if (outGoingCurrency && incomingCurrency) {
      dispatch(updateRelativeFav(outGoingCurrency, username));
      dispatch(updateRelativeFav(incomingCurrency, username));
      setoutGoingCurrency(null);
      closeFunc();
    }
  };

  return (
    <div className="replace-favorite-container">
      <p>
        You've reached to maximum amount of favorite currencies. <br />
        Which one would you like to replace?
      </p>

      {favorites.map((country, index) => {
        return (
          <div
            className={`favorite-container ${
              outGoingCurrency === country ? "clicked" : ""
            }`}
            key={index}
            onClick={() => setoutGoingCurrency(country)}
          >
            <Currency currencyIsoCode={country} />
          </div>
        );
      })}

      <div className="buttons-container">
        <button className="btn cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
        
        <div className={`btn-wrapper ${outGoingCurrency ? "" : "disabled"}`}>
          <button
            className={`btn replace-btn ${outGoingCurrency ? "" : "disabled"}`}
            onClick={handleReplace}
          >
            Replace
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplaceFavorite;
