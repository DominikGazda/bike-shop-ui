import OrderClientForm from '../components/order/OrderClientForm';
import React, { Fragment } from 'react';
import { Row } from 'react-bootstrap';
import OrderClientSummaryCart from '../components/order/OrderClientSummaryCart';
import ShipmentDetails from '../components/order/ShipmentDetails';
import { useSelector } from 'react-redux';
import PaymentMethod from '../components/order/PaymentMethod';
import OrderAgreements from '../components/order/OrderAgreements';

const OrderClientDetails = () => {
    const deliveryPrice = useSelector(state => state.items.delivery.price);
    const deliveryName = useSelector(state => state.items.delivery.name);
    
    return (
        <Fragment>
            <Row>
                <OrderClientForm/>
            </Row>
        </Fragment>
    );
}


export default OrderClientDetails;