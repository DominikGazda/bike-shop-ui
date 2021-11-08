import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { Fragment} from "react";
import classes from "./ItemCard.module.css";
import { Avatar } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';



const ReviewCard = (props) => {

  return (
    <Card className="m-4" key={props.id} style={{ width: "14rem"}}>
    <Avatar src={props.image} style={{alignSelf:"center"}}/>
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>{props.opinion}</Card.Text>
    </Card.Body>
  </Card>
  );
};

export default ReviewCard;