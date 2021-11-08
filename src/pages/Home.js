import { Fragment, useEffect } from "react";
import ImageGrid from "../components/layout/ImageGrid";
import Reviews from "../components/layout/Reviews";
import ItemsCarousel from "../components/UI/ItemsCarousel";
import "./Home.css";
import axios from "axios";
import { useState,useCallback } from "react";
const DUMMY_BIKES = [
  {
    id: "bike1",
    bikeName: "Rower elektryczny R-RAYMON CrossRay E 7.0",
    price: 12000,
    bikeImage: "./../../assets/bike.png",
  },
  {
    id: "bike2",
    bikeName: "Rower elektryczny R-RAYMON CrossRay E 8.0",
    price: 13000,
    bikeImage: "./../../assets/bike.png",
  },
  {
    id: "bike3",
    bikeName: "Rower elektryczny R-RAYMON CrossRay E9.0",
    price: 14000,
    bikeImage: "./../../assets/bike.png",
  },
  {
    id: "bike4",
    bikeName: "Rower elektryczny R-RAYMON CrossRay E9.0",
    price: 14000,
    bikeImage: "./../../assets/bike.png",
  },
  {
    id: "bike5",
    bikeName: "Rower elektryczny R-RAYMON CrossRay E9.0",
    price: 14000,
    bikeImage: "./../../assets/bike.png",
  },
];

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [newestItems, setNewestItems] = useState({});

  const fetchNewestBikes = useCallback(async() => {
    try{
      setIsLoading(true);
      const response = await axios("http://localhost:8765/api/bikes/new");
      const data = response.data;
      setNewestItems(data);
      setIsLoading(false);
    } catch(error){

    }
  },[]);

  useEffect(() => {
    fetchNewestBikes();
  },[]);

  return (
    <Fragment>
      <ImageGrid/>
      <div className="headers-div">
        <hr className="body-hr"></hr>
        <h1>Nowości wśród rowerów</h1>
      </div>
      {!isLoading && <ItemsCarousel items={newestItems} />}
      <div className="headers-div">
        <hr className="body-hr"></hr>
        <h1>Opinie klientów</h1>
        <Reviews />
      </div>
     
    </Fragment>
  );
};

export default Home;
