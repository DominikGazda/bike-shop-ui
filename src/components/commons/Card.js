import { CardColumns, Button, Col, Row, Card } from "react-bootstrap";

const CardItem = (props) => {
  return (
    <Card className="m-4" key={props.id} style={{ width: "14rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>Text</Card.Text>
        <Button variant="primary" href="" target="_blank">
          More Info
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
