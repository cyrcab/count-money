// Profile.tsx
import React, { useState } from "react";
import { Container, Tabs, Tab, Button } from "@mui/material";
import "../../Css/Profile.css";
import UserInfo from "./UserInfo";
import UserRssManagement from "./UserRssManagement";
import UserPreference from "./UserPreference";

interface ProfileProps {
  onTabChange: (tab: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState<string>("Profile");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    onTabChange(newValue);
  };

  return (
    <Container className="containerProfile">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Profile" value="Profile" />
        <Tab label="RSS Watchlist" value="RSSWatchlist" />
        <Tab label="Preferences" value="Preferences" />
        <Tab label="Logout" value="Logout" />
      </Tabs>
      <Container>
        {selectedTab === "Profile" && <UserInfo />}
        {selectedTab === "RSSWatchlist" && <UserRssManagement />}
        {selectedTab === "Preferences" && <UserPreference />}
        {selectedTab === "Logout" && (
          <Container className="LogoutTab">
            <Button variant="contained" onClick={() => console.log("Logout")} sx={{ width: "250px", height: "100px", fontSize:"40px"}} >
              Logout
            </Button>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default Profile;
