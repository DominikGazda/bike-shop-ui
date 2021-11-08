import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { Fragment } from "react";
import classes from "./ItemCard.module.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";



const ItemCard= (props) => {
  
  const modifiedLink = props.name.replaceAll(" ","-");
  console.log(props.image);
  return (
    <Card className="m-4" key={props.id} style={{ width: "14rem", position:'static'}}>
    <Card.Img variant="top" src={props.image.imageUrl} />
    <Card.Body >
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>{props.price}</Card.Text>
      <Link to={`/${props.type.toLowerCase()}/${modifiedLink}`}>
      <Button variant="primary" href="" target="_blank">
        More Info
      </Button>
      </Link>
    </Card.Body>
  </Card>
  );
};

export default ItemCard;
