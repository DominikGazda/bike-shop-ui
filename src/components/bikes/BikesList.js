import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../api/fetchBikes";
import Bikes from "../../pages/Bikes";
import ItemCard from "../commons/ItemCard";

const BikesList = (props) => {
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
