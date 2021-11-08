import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";


const OrderClientSummaryCart = (props) => {
    const totalPrice = useSelector(state => state.items.itemsPrice);
    // const deliveryPrice = useSelector(state => state.items.deliveryPrice);
    const deliveryPrice = props.deliveryPrice;

    return (
        <Card key={props.id} style={{width:"100%", backgroundColor:"#ebe7e7"}}>
          <Card.Img variant="top" src={props.image} />
          <Card.Body>
            <Card.Title><b>Podsumowanie</b></Card.Title>
            <Card.Text>
              Wartość zakupów: {totalPrice} zł<br/>
              Kosz dostawy: {deliveryPrice === 0 ? <b style={{color:"green"}}>GRATIS</b>: <b>{deliveryPrice} zł</b>} 
              <hr/>
              Do zapłaty: {totalPrice + deliveryPrice} zł
              {/* <Button
                variant="primary"
                href=""
                target="_blank"
                style={{ marginTop: "10px" }}
              >
                Kupuję i płacę
              </Button> */}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    };

export default OrderClientSummaryCart;