import { Col, Card } from "react-bootstrap";
import DeliveryTable from "../layout/DeliveryTable"
import { Fragment } from "react";

const DeliveryCart = () => {
    return (
            <Fragment>
            <Col md={4}>
            <Card className="m-4"  style={{ width: "14rem" }}>
            <Card.Img variant="top" src="./../../assets/delivery-fully-assembled.png" />
            <Card.Body>
                <DeliveryTable
                   description = "Rower złożony przez specjalistę"
                   delivery = "Odbiór w punkcie w Twoim mieście"
                   sendDetails = "Koszt wysyłki do serwisu GRATIS"/>
            </Card.Body>
          </Card>
          </Col>
          <Col md={4}>
            <Card className="m-4" style={{ width: "14rem",paddingBottom:"18px" }}>
            <Card.Img variant="top" src="./../../assets/delivery-self-assembly.png" />
            <Card.Body>
                <DeliveryTable
                   description = "Rower do samodzielnego montażu"
                   delivery = "Kurier DPD "
                   sendDetails = "Koszt wysyłki do serwisu GRATIS"/>
            </Card.Body>
          </Card>
          </Col>
          <Col md={4}>
            <Card className="m-4"  style={{ width: "14rem" }}>
            <Card.Img variant="top" src="./../../assets/delivery-partially-assembled.png" />
            <Card.Body>
                <DeliveryTable
                   description = "Rower wstępnie złożony i wyregulowany przez naszego specjalistę"
                   delivery = "Kurier DPD"
                   sendDetails = "Koszt wysyłki 99 zł"/>
            </Card.Body>
          </Card>
          </Col>
          </Fragment>
)}

export default DeliveryCart;