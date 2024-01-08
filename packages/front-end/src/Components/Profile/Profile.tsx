// Profile.tsx
import React, { useState } from "react";
import { Container, Tabs, Tab } from "@mui/material";
import "../../Css/Profile.css";
import UserInfo from "./UserInfo";
import UserRssManagement from "./UserRssManagement";

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
        <Tab label="Profil" value="Profile" />
        <Tab label="Flux RSS" value="RSSWatchlist" />
      </Tabs>
      <Container>
        {selectedTab === "Profile" && <UserInfo />}
        {selectedTab === "RSSWatchlist" && <UserRssManagement />}
      </Container>
    </Container>
  );
};

export default Profile;
