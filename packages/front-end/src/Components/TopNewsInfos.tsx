import "../Css/TopNewsInfos.css";
import { Button, Container, Typography } from "@mui/material";
import defaultImage from "../assets/article.jpg";

interface TopNewsInfosProps {
  selectedArticles: {
    imgSrc: string;
    title: string;
    link: string;
  } | null;
}

const TopNewsInfos: React.FC<TopNewsInfosProps> = ({ selectedArticles }) => {
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
