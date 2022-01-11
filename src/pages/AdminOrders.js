import { useCallback, useState } from "react";
import { Card, Col, Row, Image, Button } from "react-bootstrap";
import moment from 'moment';
import axios from "axios";
import apiSpec from '../api/apiSpec';
import { Link, NavLink } from "react-router-dom";
import './AdminOrders.css';
import { useSelector } from "react-redux";

const AdminOrders = (props) => {
    const flag = useSelector(state => state.modalHandler.flag);
    let renderedOrders = [];
    const [orders, setOrders] = useState({...props.orders})
    
    const renderOrder = () => {
        for(let object in orders){
            if(orders[object]?.length > 0){
                orders[object]?.map(item => (
                    renderedOrders.push(item)
                ))
            }
        }
    }

    renderOrder();

    const fetchOrders = useCallback(async(id) => {
        console.log(id);
        const response = await axios.get(!!id ? apiSpec.ADMIN_ORDER.url+`/${id}`: apiSpec.ADMIN_ORDER.url);
        const data = response.data;
        setOrders(data);
    })

    useState(() => {
        fetchOrders();
    },[flag])

    const handleSearchInput = (event) => {
        console.log(event.target.value);
        fetchOrders(event.target.value);
    }

    return (
        <div>
            <div style={{marginTop:'1%'}}>
                <label><h5>Wpisz numer szukanego zamówienia</h5></label><br/>
               <input type="text" onChange={handleSearchInput}/>
            </div>
            {renderedOrders.map((data) => (
            <NavLink to={`/account/adm/orders/${data.orderId}`} className="nav">
               <Card className="m-2" key={data.name} style={{ width: "100%"}}>
               <Card.Body>
                 <Card.Title><b>{data.name}</b>({data.orderId})</Card.Title>
                 <Card.Text style={{}}>
                 <Row>
                   <Col md={2} style={{textAlign:"center"}}>
                     Ilość: {data.itemAmount}
                     </Col>
                   <Col md={3} style={{textAlign:"center"}}>
                       Nazwa: {data.name}
                       </Col>
                       <Col md={3} style={{textAlign:"center"}}>
                       Data: {moment(data.orderDate).format('MM/DD/YYYY')}
                       </Col>
                       <Col md={2} style={{textAlign:"center"}}>
                        Staus: {data.status}
                       </Col>
                       <Col md={2} style={{textAlign:"right"}}>
                        Cena: {data.price * data.itemAmount} zł
                   </Col>
                 </Row>
                 </Card.Text>
               </Card.Body>
             </Card>
             </NavLink>
            ))}
        </div>
    )
}
export default AdminOrders;