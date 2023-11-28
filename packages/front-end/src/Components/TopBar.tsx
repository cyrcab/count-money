import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import LoginModal from "./Authentification/LoginModal"; // Importez le composant LoginModal
import "../Css/TopBar.css";
import logo from "../assets/logo.jpg";

interface TopBarProps {
  onTabChange: (tab: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onTabChange }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Crypto");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);


  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onTabChange(item);
  };

  const handleLogin = () => {
    // Ouvrir la modal en mettant le state isLoginModalOpen à true
    setLoginModalOpen(true);
    console.log(isLoginModalOpen);
  };

  const handleLogout = () => {
    // Votre logique de déconnexion ici
    // Si la déconnexion réussit, mettez à jour le state isLoggedIn
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
              selectedItem === "Crypto" ? "selected" : ""
            }`}
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
            {/* Ouvrir la modal en cliquant sur le bouton Login */}
            <div className="login" onClick={handleLogin}>
              Login
            </div>
            <Button variant="contained" onClick={handleLogin}>
              Sign up
            </Button>
          </>
        )}
      </div>

      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
    </div>
  );
};

export default TopBar;
