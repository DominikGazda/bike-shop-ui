import { Fragment } from "react";
import OrderList from "../components/order/OrderList";
import OrderSummary from "../components/order/OrderSummary";


const OrderDetails = (props) => {
    return (
        <Fragment>
            <OrderList/>
            <OrderSummary/>
        </Fragment>
    )
}

export default OrderDetails;