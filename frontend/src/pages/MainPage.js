import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import useLogout from "../hooks/useLogout";
import currenciesData from "../data/currenciesData";
import Map from "../components/Map";
import SideButton from "../components/SideButton";
import SideBar from "../components/SideBar";
import Menu from "../components/Menu";

const MainPage = () => {
  const state = useSelector((state) => state);
  const mainAmount = state.mainAmount;
  const mainCountry = state.mainCountry;
  const users = state.users;
  const rateList = state.rateList;

  const intervalRef = useRef(null);
  const { username } = useParams();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const [expiration, setExpiration] = useState();
  const url = process.env.REACT_APP_SERVER_URL;
  const favorites = users[username].fav_countries;
  const token = sessionStorage.getItem("token");

  const getTokenExp = async (token) => {
    try {
      const resp = await axios.post(`${url}/token`, {
        token: token,
      });
      setExpiration(resp.data.exp);
    } catch (error) {
      navigate("/login", { replace: true });
      alert(`Invalid token\nError: ${error.response.data.error}`);
    }
  };

  const checkTokenExpiring = () => {
    const nowDate = new Date();
    const expDate = new Date(expiration * 1000);

    if (expiration && nowDate > expDate) {
      const userObj = users[username];
      logout(username, userObj);
      clearInterval(intervalRef.current);
      alert("Token expired!");
    }
  };

  useEffect(() => {
    getTokenExp(token);

    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--inner-height", `${window.innerHeight}px`);
    };

    appHeight();
    window.addEventListener("resize", appHeight);

    return () => window.removeEventListener("resize", appHeight);
  }, []);

  useEffect(() => {
    if (expiration) {
      intervalRef.current = setInterval(checkTokenExpiring, 15000);
      return () => clearInterval(intervalRef.current);
    }
  }, [expiration]);

  return token ? (
    <div>
      <Map
        mainAmount={mainAmount}
        mainCountry={mainCountry}
        rateList={rateList}
      />
      <SideButton />
      <SideBar
        username={username}
        mainAmount={mainAmount}
        currencies={currenciesData}
        rateList={rateList}
        favorites={favorites}
      />
      <Menu username={username} users={users} />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default MainPage;
