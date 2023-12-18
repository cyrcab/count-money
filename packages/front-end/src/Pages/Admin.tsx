import React, { useState } from "react";
import "../Css/Admin.css";
import { Button, Container, Tab, Tabs } from "@mui/material";
import CryptoManagement from "../Components/admin/CryptoManagement";
import RssManagement from "../Components/admin/RssManagement";
import UserManagement from "../Components/admin/UserManagement";

const Admin: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>("CryptoManagement");
  
    const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
      setSelectedTab(newValue);
    };
  
    const renderTabContent = () => {
      switch (selectedTab) {
        case "CryptoManagement":
          return <CryptoManagement />;
        case "RssManagement":
          return <RssManagement />;
        case "UserManagement":
          return <UserManagement />;
        default:
          return <CryptoManagement />;
      }
    };
  
    return (
      <div className="AdminLayout">
        <div className="AdminTheme">
          <Container>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              sx={{fontSize : "70px" }}
            >
              <Tab label="CryptoManagement" value="CryptoManagement" className={selectedTab !== "CryptoManagement" ? "unselectedTab" : ""}/>
              <Tab label="RssManagement" value="RssManagement" className={selectedTab !== "RssManagement" ? "unselectedTab" : ""} />
              <Tab label="UserManagement" value="UserManagement" className={selectedTab !== "UserManagement" ? "unselectedTab" : ""}/>
            </Tabs>
          </Container>
          <Button>LOGOUT</Button>
        </div>
        <div className="AdminComponent">{renderTabContent()}</div>
      </div>
    );
  };
  
  export default Admin;
