import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../api/fetchBikes";
import Bikes from "../../pages/Bikes";
import ItemCard from "../commons/ItemCard";

const BikesList = (props) => {
  // const [bikesData, setBikesData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const fetchApi = useCallback(async() =>{
  //   try{
  //     setIsLoading(true);
  //     const response = await axios({
  //         method:'GET',
  //         url:"http://localhost:8765/api/bikes",
  //         headers:{
  //             'Content-Type': 'application/json',
  //         }
  //     });
  //     const data = response.data;
  //     setBikesData(data);
  //     setIsLoading(false);
  // } catch(error){
  //  }
  // },[])

  // useEffect(() => {
  //   fetchApi();
  // },[fetchApi]);

  const bikesData = props.bikesData;
  return (
    <Row>
      {bikesData.map((data) => (
        <ItemCard
          id = {data.id}
          name = {data.name}
          price = {data.price}
          image = {data.images[0]}
          type = {data.itemType}
        />
      ))}
    </Row>
  );
};
export default BikesList;
