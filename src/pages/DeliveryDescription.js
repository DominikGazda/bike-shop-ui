import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import DeliveryCart from "../components/cart/DeliveryCart";

const DeliveryDescription = () =>{
    return(
        <div>
            <h4><b>Oferujemy dwa rodzaje przesyłki kurierskiej oraz odbiór złożonego roweru w punkcie.</b></h4>
            <Row>
                <DeliveryCart />
            </Row>
        </div>
    )
}

export default DeliveryDescription;