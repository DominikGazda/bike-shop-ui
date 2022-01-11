import { Col, Row } from "react-bootstrap";
import "./ImageGrid.css";

const ImageGrid = () => {
  return (
    <Row style={{ margin: "0px", textAlign: "center" }}>
      <Col md={7} style={{ height: "fit-content", padding: "10px" }}>
        <img src="../../assets/main-left.jpg" />
      </Col>
      <Col md={5} style={{ textAlign: "center" }}>
        <Row>
          <Col md={12} style={{ height: "fit-content", width: "fit-content" }}>
            <img
              src="../../assets/main-right.jpg"
              style={{ width: "116%", padding: "10px", height: "120%" }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ height: "fit-content" }}>
            <img
              src="../../assets/main-rightt.jpg"
              style={{ width: "100%", padding: "10px" }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ImageGrid;
