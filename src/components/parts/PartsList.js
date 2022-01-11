import axios from "axios";
import { useCallback, useState } from "react";
import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../commons/ItemCard";

const PartsList = (props) => {

  const partsData = props.partsData;
    return (
        <Row>
          {partsData.map((data) => (
           <ItemCard 
           id = {data.id}
           name = {data.name}
           price = {data.price}
           image = {data.images[0]}
           type = {data.itemType}/>
          ))
          }
       </Row>
      )
}

export default PartsList;