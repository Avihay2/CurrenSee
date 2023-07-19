import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "../styles/MainCurrency.css";
import "../styles/RelativeCurrency.css";
import useModal from "../hooks/useModal";
import { updateRelativeFav } from "../actions";
import { limitFloats } from "../handle";
import Dropdown from "./Dropdown";
import StarIcon from "./icons/StarIcon";
import Modal from "./Modal";
import ReplaceFavorite from "./ReplaceFavorite";

const RelativeCurrency = ({
  initialCurrency,
  mainAmount,
  currencies,
  username,
  favorites,
  rateList,
}) => {
  const dispatch = useDispatch();
  const { openModal, closeModal, modalContent, isModalOpen } = useModal();

  const [currentCurrency, setCurrentCurrency] = useState(initialCurrency);
  const [icon, setIcon] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [rate, setRate] = useState(1);

  const handleIcon = () => {
    if (favorites.relatives.length < 3 || icon) {
      dispatch(updateRelativeFav(currentCurrency, username));
      setIcon(!icon);
      return;
    }

    const favModal = (
      <Modal
        message={
          <ReplaceFavorite
            favorites={favorites.relatives}
            incomingCurrency={currentCurrency}
            username={username}
            closeFunc={closeModal}
          />
        }
      />
    );
    openModal(favModal);
  };

  const updateCurrentCurrency = (code) => {
    setCurrentCurrency(code);
  };

  const changeSymbol = (newSymbol) => {
    setSymbol(newSymbol);
  };

  useEffect(() => {
    if (rateList) {
      setRate(limitFloats(rateList[currentCurrency] * +mainAmount));
    }
  }, [currentCurrency, mainAmount, rateList]);

  useEffect(() => {
    setIcon(favorites.relatives.includes(currentCurrency) ? true : false);
  }, [currentCurrency, favorites]);

  return (
    <div className="select-currency-container relative-currency">
      <div className="modal">{isModalOpen && modalContent}</div>

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
        <span className="rate-span">{rate}</span>
        <span className="currency-symbol">{symbol}</span>
      </div>
    </div>
  );
};

export default RelativeCurrency;
