// NewsList.tsx
import React, { useState } from "react";
import { Container, Tabs, Tab, List, ListItem, ListItemText } from "@mui/material";
import "../Css/NewsList.css";

const NewsList: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("topNews");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  // Dummy data for favorite articles
  const favoriteArticles = [
    { id: 1, title: "Article 1", category: "Tech" },
    { id: 2, title: "Article 2", category: "Finance" },
    { id: 3, title: "Article 3", category: "Health" },
    { id: 4, title: "Article 4", category: "Science" },
    { id: 5, title: "Article 5", category: "Business" },
  ];

  return (
    <Container className="containerNewsList">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="TopNews" value="topNews" />
        <Tab label="Favorite" value="favorite" />
      </Tabs>
      {selectedTab === "topNews" && (
        <Container>
          <List>
            {/* Render top news articles */}
            <ListItem>
              <ListItemText primary="Top News Article 1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Top News Article 2" />
            </ListItem>
            {/* Add more articles as needed */}
          </List>
        </Container>
      )}
      {selectedTab === "favorite" && (
        <Container>
          <List>
            {/* Render favorite articles */}
            {favoriteArticles.map((article) => (
              <ListItem key={article.id}>
                <ListItemText primary={`${article.title} (${article.category})`} />
              </ListItem>
            ))}
          </List>
        </Container>
      )}
    </Container>
  );
};

export default NewsList;
