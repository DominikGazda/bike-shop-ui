import { useState } from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import moment from 'moment';
const UserOrders = (props) => {
    let renderedOrders = [];
    const orders = {...props.userOrders}

    const renderOrder = () => {
        for(let object in orders){
            if(orders[object].length > 0){
                orders[object].map(item => (
                    renderedOrders.push(item)
                ))
            }
        }
    }
    
    renderOrder();

    return (
        <div>
            {renderedOrders.map((data) => (
               <Card className="m-2" key={data.name} style={{ width: "100%"}}>
               <Card.Body>
                 <Card.Title><b>{data.name}</b></Card.Title>
                 <Card.Text style={{}}>
                 <Row>
                   <Col md={3} style={{textAlign:"center"}}>
                     Ilość: {data.itemAmount}
                     </Col>
                   <Col md={3} style={{textAlign:"center"}}>
                       Nazwa: {data.name}
                       </Col>
                       <Col md={3} style={{textAlign:"center"}}>
                       Data: {moment(data.orderDate).format('MM/DD/YYYY')}
                       </Col>
                       <Col md={3} style={{textAlign:"right"}}>
                   {data.price * data.itemAmount} zł
                   </Col>
                 </Row>
                 </Card.Text>
               </Card.Body>
             </Card>
            ))}
        </div>
    )
}
export default UserOrders;