import "../../Css/CarousselFlux.css";
import { Container } from "@mui/material";
import React, { useEffect } from "react";
// import Carousel from "react-material-ui-carousel";
import img1 from "../../assets/s1222i7.jpg";
import raccoon from "../../assets/raccoon.jpg";
import axios from "axios";
import Parser from "rss-parser";

const CarousselFlux: React.FC = () => {

  useEffect(() => {
    const RssArticle = axios.get("http://localhost:3000/api/rss").then((response) => {
      console.log(response.data);
    });
    console.log(RssArticle);
  }, []);

  const [tests] = React.useState([
      { image: img1, description: "count-moneyackagesront-end> " },
      { image: raccoon, description: "}>Liste des Cryptomonnaies" },
      { image: img1, description: "Description3" },
      { image: raccoon, description: "rial/Butto" },
      { image: img1, description: "s Cryptomonn" },
      { image: raccoon, description: "Description6" },
      { image: img1, description: "Description7" },
      { image: raccoon, description: "Description8" },
      { image: img1, description: "Description9" },
      { image: raccoon, description: "Description10" },
    ]);

  const groupedImages = [];
  while (tests.length > 0) {
    groupedImages.push(tests.splice(0, 5));
  }
       

  return (
    <Container className="containerCarousselFlux" maxWidth='xl' >
      {/* <Carousel className="Showcase" animation="slide" autoPlay={true} swipe={false} interval={10000} duration={400} indicators={false} navButtonsAlwaysVisible={true}>
          {groupedImages.map((imagesGroup, index) => (
        <div className="Showcase_div" key={index}>
          {imagesGroup.map(({ image, description }, subIndex) => (
            <div key={index * 4 + subIndex}>
              <img className="Showcase_img" src={image} alt={`img-${index * 4 + subIndex}`} />
              <div className="Showcase_description">{description}</div>
            </div>
          ))}
        </div>
      ))}
    </Carousel> */}
    </Container>
  );
};

export default CarousselFlux;