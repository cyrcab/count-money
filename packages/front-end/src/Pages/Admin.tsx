import React, { useState } from "react";
import "../Css/Admin.css";
import { Container, Tab, Tabs } from "@mui/material";
import CryptoManagement from "../Components/admin/CryptoManagement";
import RssManagement from "../Components/admin/RssManagement";
import UserManagement from "../Components/admin/UserManagement";
import logo from "../assets/logo.jpg";

const Admin: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>();

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
                    textColor="primary"
                >
                    <Tab label="CryptoManagement" value="CryptoManagement"/>
                    <Tab label="RssManagement" value="RssManagement" />
                    <Tab label="UserManagement" value="UserManagement"/>
                </Tabs>
            </Container>
        </div>
        <div className="AdminComponent">
         {renderTabContent()}
        </div>
    </div>


  );
}
export default Admin;
