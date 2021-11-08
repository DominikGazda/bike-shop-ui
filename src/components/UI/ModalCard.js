import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import Modal from "./Modal";

const ModalCard = (props) => {
    const dispatch = useDispatch();
    const itemState = useSelector(state => state.items);
    const items = itemState.items;
    const totalPrice = itemState.itemsPrice;
    const history = useHistory();

    const addItemToCartHandler = (item) => {
        dispatch({type: "ADD_ITEM", itemDetails: {
            item,
            amount: 1,
        }});
    }

    const deleteItemFromCartHandler = (item) => {
        console.log(item);
        dispatch({type: "DELETE_ITEM", itemDetails:{
            item,
            amount: 1,
        }});
    }

    const orderButtonHandler = () => {
        history.push("/order");
        props.onHideModal();
    }

    return (
        <Modal onHideModal = {props.onHideModal}>
            {items.length === 0 && <p>Koszyk jest pusty</p>}
            {items.map((item) => (
                <Card>
                   {item.name}
                   <Button style={{float:"right", marginLeft:"10px", backgroundColor:'blue'}} onClick={addItemToCartHandler.bind(null, item)}>+</Button>
                   <Button  style={{float:"right",backgroundColor:'red'}} onClick={deleteItemFromCartHandler.bind(null, item)}>-</Button><br/>
                   Ilość: {item.itemAmount}
                </Card>
            ))}
            {totalPrice > 0 &&<b>Cena: {totalPrice} zł</b>}
            <br/>
            <Button onClick = {props.onHideModal} variant="primary">
             Powrót
            </Button>
            {!(items.length === 0) && <Button onClick = {orderButtonHandler} variant="primary" style={{float:"right"}}>
             Zamów
            </Button>}
        </Modal>
    )
}

export default ModalCard;