import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import "../Css/TopBar.css";
import logo from "../assets/logo.jpg";

interface TopBarProps {
  onTabChange: (tab: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onTabChange }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Crypto");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onTabChange(item);
  };

  const handleLogin = () => {
    // Your authentication logic here
    // If authentication is successful, update the isLoggedIn state
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Your logout logic here
    // If logout is successful, update the isLoggedIn state
    setIsLoggedIn(false);
  };

  return (
    <div className="containerTopBar">
      <div className="leftSection">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <Link to="/">
          <div 
            className={`onglet ${
              selectedItem === "Crypto" ? "selected" : ""}`}
            onClick={() => handleItemClick("Crypto")}
          >
            Crypto
          </div>
        </Link>
        <Link to="/">
        <div
            className={`onglet ${
              selectedItem === "Actualité" ? "selected" : ""
            }`}
            onClick={() => handleItemClick("Actualité")}
          >
            Actualités
          </div>
        </Link>
      </div>
      <div className="rightSection">
        {isLoggedIn ? (
          <>
            <div className="watchlist">Watchlist</div>
            <Avatar alt="Alex" src="/static/images/avatar/1.jpg" onClick={handleLogout} />
          </>
        ) : (
          <>
            <div className="login">Login</div>
            <Button variant="contained" onClick={handleLogin}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
