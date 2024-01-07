// NewsList.tsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Tabs,
  Tab,
  List,
} from "@mui/material";
import "../Css/NewsList.css";
import api from "../axios.config";
import { AxiosResponse } from "axios";
import { ButtonGroup, Button } from "@mui/material";

export interface ArticleData {
  imgSrc: string;
  title: string;
  link: string;
}

interface NewsListProps {
  onSelectArticle: (article: ArticleData | null) => void;
}

const NewsList: React.FC<NewsListProps> = ({ onSelectArticle }) => {
  
  const [selectedTab, setSelectedTab] = useState<string>("topNews");
  const [articles, setArticles] = useState<ArticleData[]>([]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    api
      .get("/rss")
      .then((response: AxiosResponse) => {
        setArticles(response.data.rssData);
        console.log(response.data.rssData);
      })
      .catch((error: AxiosResponse) => {
        console.log(error);
      });
  }, []);

  const handleArticleClick = (article: ArticleData) => {
    // Passez les données de l'article au parent (Home)
    onSelectArticle(article);
  };

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
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="text"
            className="buttonGroup"
          >
            {articles.map((item) => (
              <Button
                key={item.link}
                className="articles"
                onClick={() => handleArticleClick(item)}
              >
                {item.title}
              </Button>
            ))}
          </ButtonGroup>
        </Container>
      )}

      {selectedTab === "favorite" && (
        <Container>
          <List>
            {/* Render favorite articles */}
            {/* ... */}
          </List>
        </Container>
      )}
    </Container>
  );
};

export default NewsList;
