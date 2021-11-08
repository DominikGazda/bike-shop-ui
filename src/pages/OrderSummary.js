import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const OrderSummary = (props) => {

    const dispatch = useDispatch();

    dispatch({type:'CLEAR_CART'});

    return (
        <Fragment>
            <center>
                <h3>Dziękujemy za zakup w naszym sklepie</h3>
                <h5>Na podany adres e-mail przesłane zostały dane do przelewu.</h5>
                <h6>Zapraszamy ponownie !</h6>
                <img src="../../assets/order_summary_bike.png" style={{height:'30%', width:'10%'}}/><br/>
                <Link to="/">
                <Button className="btn btn-alert">Strona główna</Button>
                </Link>
            </center>
        </Fragment>
    )

}
export default OrderSummary;