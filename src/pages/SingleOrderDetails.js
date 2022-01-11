import { useLocation } from "react-router";
import {useParams} from "react-router-dom";
import { useCallback, useState, useRef } from "react";
import apiSpec from '../api/apiSpec';
import axios from "axios";
import moment from 'moment';
import React from 'react';
import { Card, Col, Row, Image, Button, ButtonGroup } from "react-bootstrap";
import './SingleOrderDetails.css'
import SelectInput from './../components/commons/SelectInput';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from "react-redux";

const SingleOrderDetails = (props) => {
    const jwt = useSelector(state => state.userLogin.jwt);
    const {orderId} = useParams();
    let renderedOrders = [];
    let orderDetails;
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState({});
    const [filteredItems, setFilteredItems] = useState({});
    const dispatch = useDispatch();
    const statusRef = useRef();
    const [orderStatus, setOrderStatus] = useState(true);

    const fetchOrders = useCallback(async(id) => {
        const response = await axios.get(apiSpec.ADMIN_ORDER.url+`/details/${orderId}`);

        const data = response.data;
        setOrders(data);
        setIsLoading(false);
    },[orders])

    const changeStatusAPI = useCallback(async(parameter) => {
      const response = await axios({
        method: apiSpec.CHANGE_ORDER.operation,
        url: apiSpec.CHANGE_ORDER.url,
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${jwt}`
          },
        params: {parameter, orderId}
        }
      );
      const data = response.data;
      setOrderStatus(!orderStatus);
      fetchOrders();
  })

    const deleteButtonHandler = () => {
        dispatch({type:"SHOW_MODAL", orderId});
    }

    const handleChangeStatusButton = () => {
      changeStatusAPI(statusRef.current.innerText);
    }

    const {bag, bottle, fender, pump, brake, drive, frame, maintenance, rack, tool, bike} = orders;
    renderedOrders.push(bag, bottle, fender, pump, brake, drive, frame, maintenance, rack, tool, bike);
    const filteredOrder = renderedOrders.filter(item => (
        item !== null
    ));
    orderDetails = {...filteredOrder[0]};

    useState(() => {
        fetchOrders();
    },[orderStatus])

    return (
        <React.Fragment>
               <Card className="m-2" key={orderDetails?.name} style={{ width: "100%"}}>
               <Card.Body>
                 <Card.Title><b>{orderDetails?.name}</b>({orderId})</Card.Title>
                 <Card.Text style={{}}>
                 <Row>
                   <Col md={2}>
                   {!isLoading && <Card.Img variant="left" src={orderDetails?.images[0]?.imageUrl} style={{height:'100%', width:'100%'}}/>}
                     </Col>
                   <Col md={2} style={{textAlign:"center"}}> 
                     Ilość: {orderDetails?.itemAmount}
                     </Col>
                   <Col md={2} style={{textAlign:"center"}}>
                       Nazwa: {orderDetails?.name}
                       </Col>
                       <Col md={2} style={{textAlign:"center"}}>
                       Data: {moment(orderDetails?.orderDate).format('MM/DD/YYYY')}
                       </Col>
                       <Col md={2} style={{textAlign:"center"}}>
                        Staus: {orders?.status}
                       </Col>
                       <Col md={2} style={{textAlign:"right"}}>
                        Cena: {orderDetails?.price * orderDetails?.itemAmount} zł
                   </Col>
                 </Row>
                 <br/>
                 {!isLoading && <Row>
                   <h4>Dane adresowe</h4>
                   <Col md={6}>
                     <p>Imię</p>
                     <p>Nazwisko:</p>
                     <p> Ulica</p>
                     <p>Numer domu</p>
                     <p>Numer lokalu</p>
                     <p> Miasto:</p>
                     <p> Kod pocztowy</p>
                     <p> E-mail:</p>
                     <p> Telefon kontaktowy:</p>
                   </Col>
                   <Col md={6} >
                  
                     <input type="text" disabled={true} placeholder={orders.user.address?.name} /><br/>
                   
                     <input type="text" disabled={true} placeholder={orders.user.address?.surname} className="input"/><br/>
                     
                      <input type="text" disabled={true} placeholder={orders.user.address?.street} className="input"/><br/>
                    
                     <input type="text" disabled={true} placeholder={orders.user.address?.houseNumber} className="input"/><br/>
                 
                     <input type="text" disabled={true} placeholder={orders.user.address?.localNumber} className="input"/><br/>
                   
                     <input type="text" disabled={true} placeholder={orders.user.address?.city} className="input"/><br/>
                   
                     <input type="text" disabled={true} placeholder={orders.user.address?.zipCode} className="input"/><br/>
                   
                     <input type="text" disabled={true} placeholder={orders.user.address?.email} className="input"/><br/>
                   
                     <input type="text" disabled={true} placeholder={orders.user.address?.phone} className="input"/><br/>
                   </Col>
                 </Row>}
                 <hr/>
                 <Row>
                   <Col md={4}>
                   <p style={{marginTop:'5%'}}><h4>Zmień status zamówienia</h4></p>
                   </Col>
                   <Col md={3}>
                     {/* <SelectInput name="status" value={['NOWE', 'REALIZOWANE', 'ZREALIZOWANE']}/> */}
                     <SelectInput description="Status" items={["Nowe","Realizowane","Zrealizowane"]} ref={statusRef}/>
                   </Col>
                   <Col md={3}>
                     <Button style={{height:'85%', marginTop:'3%'}} onClick={handleChangeStatusButton}>Zmień status</Button>
                   </Col>
                 </Row>
                 <hr/>
                 <Row>
                   <Col md={12}>
                     <Button onClick={deleteButtonHandler}  variant="danger"><h4>Usuń zamówienie</h4></Button>
                   </Col>
                 </Row>
                 </Card.Text>
               </Card.Body>
               </Card>
            </React.Fragment>
    )
}
export default SingleOrderDetails;