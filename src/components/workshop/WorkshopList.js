import axios from "axios";
import { useCallback, useState } from "react";
import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../commons/ItemCard";

const WorkshopList = (props) => {

  const workshopData = props.workshopData;

    return (
        <Row>
          {workshopData.map((data) => (
              <ItemCard
              id = {data.id}
              name = {data.name}
              price = {data.price}
              image = {data.images[0]}
              type = {data.itemType}
            />
          ))
          }
       </Row>
      )
}

export default WorkshopList;