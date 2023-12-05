// Profile.tsx
import React, { useState } from "react";
import { Container, Tabs, Tab } from "@mui/material";
import "../../Css/Profile.css";
import UserInfo from "./UserInfo";
import UserRssManagement from "./UserRssManagement";
import UserPreference from "./UserPreference";

const Profile: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Profile");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
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
      </Tabs>
      <Container>
        {selectedTab === "Profile" && <UserInfo />}
        {selectedTab === "RSSWatchlist" && <UserRssManagement />}
        {selectedTab === "Preferences" && <UserPreference />}
      </Container>
    </Container>
  );
};

export default Profile;
