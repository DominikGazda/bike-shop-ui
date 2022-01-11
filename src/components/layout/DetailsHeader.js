import { Col, Row } from "react-bootstrap";
import DetailsCarousel from "../UI/DetailsCarousel";
import DetailsCart from "./../cart/DetailsCart";
import Fragment from "react";

const DetailsHeader = (props) => {
  const currentItem = props.item;

  return (
    <Row>
      <Col md={8}>
        <h3>
          <b>{currentItem.name}</b>
        </h3>
        <DetailsCarousel images={currentItem.images} />
      </Col>
      <Col md={4}>
        <DetailsCart item={currentItem} />
      </Col>
    </Row>
  );
};

export default DetailsHeader;
