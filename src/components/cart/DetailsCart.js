import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import DetailsTable from "../layout/DetailsTable";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

const DetailsCart = (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.userLogin.isLoggedIn);
  const amountInput = useRef();
  
  const item = props.item;
  const addItemHandler = () => {  
    dispatch({ type: "ADD_ITEM", itemDetails: {
      item,
      amount: +amountInput.current.value
    } });
    amountInput.current.value = 1;
  };

  return (
    <Card className="m-5" key={props.id} style={{ width: "14rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>Cena: {item.price?.toFixed(2)} zł</Card.Title>
        <Card.Text>
          Ilość:
          <input
            ref={amountInput}
            type="number"
            min={1}
            max={5}
            defaultValue={1}
            style={{ marginBottom: "10px" }}
          />
          <DetailsTable item = {item}/>
          <Button
            onClick={addItemHandler}
            variant="primary"
            href=""
            target="_blank"
            style={{ marginTop: "10px" }}
          >
            Do koszyka
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DetailsCart;
