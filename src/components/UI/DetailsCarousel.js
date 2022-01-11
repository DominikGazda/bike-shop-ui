import React from "react";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";

const DetailsCarousel = (props) => {
  const imagess = props.images.map((img) => ({
    src: img.imageUrl,
  }));
  console.log(imagess);

  const images = [900, 800, 700, 600, 500].map((size) => ({
    src: `https://placedog.net/${size}/${size}`,
  }));

  return <Carousel images={imagess} style={{ height: "30rem" }} />;
};

export default DetailsCarousel;
