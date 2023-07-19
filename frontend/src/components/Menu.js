import { useState, useEffect } from "react";

import "../styles/Menu.css";
import useLogout from "../hooks/useLogout";
import lightLogo from "../data/LightCurrenSeeLogo.svg";
import darkLogo from "../data/DarkCurrenSeeLogo.svg";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";
import LogoutIcon from "./icons/LogoutIcon";
import Option from "./Option";

const Menu = ({ username, users }) => {
  const { logout } = useLogout();

  const [expand, setExpand] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const bodyElement = document.querySelector("body");

  const handleMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    const userObj = users[username];
    logout(username, userObj);
  };

  useEffect(() => {
    darkMode && bodyElement
      ? bodyElement.classList.add("dark-mode")
      : bodyElement.classList.remove("dark-mode");
  }, [darkMode]);

  return (
    <div
      className={`menu-container ${expand ? "expand" : ""}`}
      onMouseEnter={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
    >
      <img
        className="logo"
        src={darkMode ? lightLogo : darkLogo}
        alt="The webpage logo - Stacks of various coins"
        onClick={() => expand ? setExpand(false) : setExpand(true)}
      />
      <h2 className={`web-name ${expand ? "" : "hide"}`}>CurrenSee</h2>

      <div className={`options-container ${expand ? "" : "hide"}`}>
        <div className="user-profile">
          <h3>{username}</h3>
          <span>{users[username].email}</span>
        </div>

        <Option
          icon={darkMode ? <SunIcon /> : <MoonIcon />}
          description={`${darkMode ? "Light" : "Dark"} mode`}
          onClick={handleMode}
        />

        <Option
          icon={<LogoutIcon />}
          description={"Logout"}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Menu;
