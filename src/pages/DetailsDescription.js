import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "../components/UI/Card";

const DetailsDescription = (props) => {
  return (
    <Row>
      <Col md={12}>
        <p>
          <h4>
            <b>Opis produktu</b>
          </h4>
        </p>
        <Card>
          <p style={{ fontSize: "1.5rem" }}>{props.description}</p>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsDescription;
