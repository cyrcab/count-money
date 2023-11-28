import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/TopBar.css";
import logo from "../assets/logo.jpg";
import { Button } from "@mui/material";

interface TopBarProps {
  onTabChange: (tab: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onTabChange }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Crypto");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onTabChange(item);
  };

  return (
    <div className="containerTopBar">
      <div className="leftSection">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <Link to="/">
          <Button
            variant="text"
            color="inherit"
            className={`onglet ${selectedItem === "Crypto" ? "selected" : ""}`}
            onClick={() => handleItemClick("Crypto")}
          >
            Crypto
          </Button>
        </Link>
        <Link to="/">
          <Button
            variant="text"
            color="inherit"
            className={`onglet ${selectedItem === "Actualité" ? "selected" : ""}`}
            onClick={() => handleItemClick("Actualité")}
          >
            Actualité
          </Button>
        </Link>
      </div>
      <div className="rightSection">
        <div className="login">Login</div>
        <Button variant="contained">Sign up</Button>
      </div>
    </div>
  );
};

export default TopBar;
