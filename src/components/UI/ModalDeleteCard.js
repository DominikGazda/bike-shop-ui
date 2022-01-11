import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import Modal from "./Modal";
import apiSpec from "../../api/apiSpec";
import axios from "axios";
import { useCallback } from "react";

const ModalDeleteCard = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const jwt = useSelector(state => state.userLogin.jwt);
    const orderId = useSelector(state => state.modalHandler.orderId);
    const flag = useSelector(state => state.modalHandler.flag);

    const deleteOrderAPI = useCallback(async() => {
        const response = await axios({
            url: apiSpec.DELETE_ORDER.url,
            method: apiSpec.DELETE_ORDER.operation,
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${jwt}`
                },
              params: {orderId}
        })
        const data = response.data;
    })

    const hideModalHandler = () => {
        dispatch({type:"HIDE_MODAL"});
        props.onHideModal();
    }

    const hideModalHandlerAndDelete = () => {
        deleteOrderAPI();
        dispatch({type:"HIDE_MODAL", flag:!flag});
        props.onHideModal();
        history.push('/account/adm/orders');
    }

    return (
        <Modal onHideModal = {hideModalHandler}>
            <h4>Czy na pewno chcesz usunąć to zamówienie ?</h4>
            <Button onClick = {hideModalHandlerAndDelete} variant="danger">
                Tak
            </Button>
            <Button style={{marginLeft:'2%'}} onClick = {hideModalHandler} variant="primary">
                Nie
            </Button>
            
        </Modal>
    )
}

export default ModalDeleteCard;