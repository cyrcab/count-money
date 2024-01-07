import "../Css/TopNewsInfos.css";
import { Button, Container, Typography } from "@mui/material";
import defaultImage from "../assets/article.jpg";
import { useState, useEffect } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import api from "../axios.config";
interface TopNewsInfosProps {
  selectedArticles: {
    imgSrc: string;
    title: string;
    link: string;
    id:number;
  } | null;
}

const TopNewsInfos: React.FC<TopNewsInfosProps> = ({ selectedArticles }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  function getFavorite() {
      api
        .get("/article/user" )
        .then((response) => {
          console.log(response);
          const isInFavorites = response.data.article.some(
            (article: { title: string }) => article.title === selectedArticles?.title
          );
          setIsInFavorites(isInFavorites);
        })
        .catch((error) => {
          console.log(error);
        });
    }


  function setFavorite() {
    api
      .post("/article/",  selectedArticles)
      .then(() => {
        getFavorite();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteFavorite() {
    api
      .delete("/article/"+ selectedArticles?.id)
      .then(() => {
        getFavorite();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getFavorite();
  }, [selectedArticles]);

  if (!selectedArticles) {
    return (
      <Container className="containerTopNewsInfos">
        <div className="newsContainer">
          <Typography variant="h2">Actualités</Typography>
          <Typography variant="body1">Aucun article sélectionné.</Typography>
        </div>
      </Container>
    );
  }

  return (
    <Container className="containerTopNewsInfos">
      <div className="newsContainer">
        <Typography variant="h2">{selectedArticles.title}</Typography>
        <div className="containerButton">
              <Button
                variant="contained"
                color="secondary"
                style={{
                  backgroundColor: isHovered ? "gold" : "gray",
                  marginRight: "80px",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                endIcon={isHovered ? <StarIcon /> : <StarBorderIcon />}
                onClick={isInFavorites ? deleteFavorite : setFavorite}
              >
                {isInFavorites ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
            </div>
        <Button
          variant="contained"
          component="a"
          href={selectedArticles.link}
          target="_blank"
          rel="noopener noreferrer"
          className="buttonReadMore"
        >
          Lire l'article complet
        </Button>
        <img className="imgArticle"
          src={
            selectedArticles.imgSrc === "No image"
              ? defaultImage
              : selectedArticles.imgSrc
          }
        />
      </div>
    </Container>
  );
};

export default TopNewsInfos;
