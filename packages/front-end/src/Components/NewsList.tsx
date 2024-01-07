// NewsList.tsx
import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab } from "@mui/material";
import "../Css/NewsList.css";
import api from "../axios.config";
import { AxiosResponse } from "axios";
import { ButtonGroup, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../Context/RootReducer";

export interface ArticleData {
  imgSrc: string;
  title: string;
  link: string;
  id: number;
}

interface NewsListProps {
  onSelectArticle: (article: ArticleData | null) => void;
}

const NewsList: React.FC<NewsListProps> = ({ onSelectArticle }) => {
  const [selectedTab, setSelectedTab] = useState<string>("topNews");
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [favoriteArticles, setFavoriteArticles] = useState<ArticleData[]>([]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  function getFavorite() {
    api
      .get("/article/user")
      .then((response) => {
        setFavoriteArticles(response.data.article);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getRss() {
    api
      .get("/rss")
      .then((response: AxiosResponse) => {
        setArticles(response.data.rssData);
      })
      .catch((error: AxiosResponse) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRss();
    getFavorite();
  }, [selectedTab]);

  const handleArticleClick = (article: ArticleData) => {
    // Passez les données de l'article au parent (Home)
    onSelectArticle(article);
  };

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return (
    <Container className="containerNewsList">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="TopNews" value="topNews" />
        <Tab label="Favorite" value="favorite" disabled={!isLoggedIn} />
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
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="text"
            className="buttonGroup"
          >
            {favoriteArticles.map((item) => (
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
    </Container>
  );
};

export default NewsList;
