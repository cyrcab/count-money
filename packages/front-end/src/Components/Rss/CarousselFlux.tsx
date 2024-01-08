import "../../Css/CarousselFlux.css";
import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import api from "../../axios.config.ts";
import { AxiosResponse } from "axios";
import defaultImage from "../../assets/defaultImage.png";
import { useSelector } from "react-redux";
import { RootState } from "../../Context/RootReducer";

interface ImageData {
  image: string;
  description: string;
  title: string;
  link: string;
  imgSrc: string;
}

interface ImageData {
  image: string;
  description: string;
}

const CarousselFlux: React.FC = () => {
  const [groupedImages, setGroupedImages] = useState<ImageData[][]>([]);
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

  function getArticle(){
    api
      .get("/rss")
      .then((response: AxiosResponse) => {
        const newGroupedImages: ImageData[][] = [];
        while (response.data.rssData.length > 0) {
          newGroupedImages.push(response.data.rssData.splice(0, 5));
        }
        setGroupedImages(newGroupedImages);
      })
      .catch((error: AxiosResponse) => {
        console.log(error);
      });
  }

  function getArcticleLog(){
    api
    .get("/rss/" +user?.id)
    .then((response: AxiosResponse) => {
      const newGroupedImages: ImageData[][] = [];
      while (response.data.rssData.length > 0) {
        newGroupedImages.push(response.data.rssData.splice(0, 5));
      }
      setGroupedImages(newGroupedImages);
    })
    .catch((error: AxiosResponse) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if(!isLoggedIn){
      getArticle();
    }
    else{
      getArcticleLog();
    }
  }, [isLoggedIn]);

  return (
    <Container className="containerCarousselFlux">
      <Carousel
        className="Showcase"
        animation="slide"
        autoPlay={true}
        swipe={false}
        interval={10000}
        duration={400}
        indicators={false}
        navButtonsAlwaysVisible={true}
      >
        {groupedImages.map((imagesGroup, index) => (
          <div className="Showcase_div" key={index}>
            {imagesGroup.map(({ title, link, imgSrc }, subIndex) => (
              <a key={subIndex} href={link} target="_blank" rel="noopener noreferrer">
                <div key={index * 4 + subIndex}>
                  <img
                    className="Showcase_img"
                    src={imgSrc === "No image" ? defaultImage : imgSrc}
                    alt={`img-${index * 4 + subIndex}`}
                  />
                  <div className="Showcase_description">
                    <h2>{title}</h2>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarousselFlux;
