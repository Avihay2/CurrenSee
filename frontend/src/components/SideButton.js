import { useEffect, useState } from "react";

import "../styles/SideButton.css";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import ChevronUpIcon from "./icons/ChevronUpIcon";
import ChevronDownIcon from "./icons/ChevronDownIcon";

const SideButton = () => {
  const [mobileView, setMobileView] = useState(false);
  const [sidebarDisplay, setSidebarDisplay] = useState(true);

  const sidebarElement = document.getElementsByClassName("sidebar-container");

  const handleSideButton = () => {
    setSidebarDisplay(!sidebarDisplay);
  };

  useEffect(() => {
    const handleViewportResize = () => {
      window.innerWidth < 768 ? setMobileView(true) : setMobileView(false);
    };

    handleViewportResize();
    window.addEventListener('resize', handleViewportResize);
    
    return () => window.removeEventListener('resize', handleViewportResize);  
  }, []);

  useEffect(() => {
    sidebarDisplay
      ? sidebarElement[0].classList.remove("closed")
      : sidebarElement[0].classList.add("closed");
  }, [sidebarDisplay]);

  useEffect(() => {
    mobileView ? setSidebarDisplay(false) : setSidebarDisplay(true);
  }, [mobileView])

  return (
    <div
      className={`side-button-container ${sidebarDisplay ? "" : "closed"}`}
      onClick={handleSideButton}
    >
      {
        mobileView 
          ? sidebarDisplay ? <ChevronDownIcon /> : <ChevronUpIcon />
          : sidebarDisplay ? <ChevronLeftIcon /> : <ChevronRightIcon />
      }
    </div>
  );
};

export default SideButton;
