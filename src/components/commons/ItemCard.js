import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { Fragment } from "react";
import classes from "./ItemCard.module.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const ItemCard = (props) => {
  const modifiedLink = props.name?.replaceAll(" ", "-");

  return (
    <Card
      className="m-4"
      key={props.id}
      style={{ width: "14rem", position: "static", height: "30rem" }}
    >
      <Card.Img
        variant="top"
        src={props.image?.imageUrl}
        style={{ height: "20rem" }}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.price}</Card.Text>
        <Link to={`/${props.type.toLowerCase()}/${modifiedLink}`}>
          <Button variant="primary" href="" target="_blank">
            Szczegóły
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
