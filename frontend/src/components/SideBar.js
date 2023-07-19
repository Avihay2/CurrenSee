import "../styles/SideBar.css";
import MainCurrency from "./MainCurrency";
import RelativeCurrency from "./RelativeCurrency";

const SideBar = ({ username, mainAmount, currencies, rateList, favorites }) => {
  const initials = ["EUR", "GBP", "AUD"];

  return (
    <div className="sidebar-container">
      <MainCurrency
        initialCurrency={favorites.main || "USD"}
        mainAmount={mainAmount}
        currencies={currencies}
        username={username}
        favorites={favorites}
      />
      
      {initials.map((code, index) => {
        return (
          <RelativeCurrency
          key={index}
          initialCurrency={favorites.relatives[index] || code}
          mainAmount={mainAmount}
          currencies={currencies}
          username={username}
          favorites={favorites}
          rateList={rateList}
          />
          );
        })}
    </div>
  );
};

export default SideBar;
