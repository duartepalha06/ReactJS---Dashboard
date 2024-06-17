import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./navbar.css";
import moment from "moment-timezone";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [lisbonTime, setLisbonTime] = useState("");

  // Function to handle the toggle of the menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Effect to update Lisbon time
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().tz("Europe/Lisbon").format("HH:mm:ss");
      setLisbonTime(now);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div
        className={`menu-overlay ${showMenu ? "show" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`menu-container ${showMenu ? "show" : ""}`}>
        <div className="menu">
          <div className="menu-items">
            <Link to="/" onClick={toggleMenu}>
              Dashboard
            </Link>
            <Link to="/users" onClick={toggleMenu}>
              Users
            </Link>
          </div>
        </div>
      </div>
      <div className="logo-container">
        <img
          src="https://i.ibb.co/30z2CvH/logo.png"
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="lisbon-time">{lisbonTime}</div>
    </nav>
  );
};

export default Navbar;
