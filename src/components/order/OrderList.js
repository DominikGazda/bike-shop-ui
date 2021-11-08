import { Fragment, useRef, useState } from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const OrderList = (props) => {
    const order = useSelector(state => state.items);
    const orderedItems = [...order.items];
    const dispatch = useDispatch();
  


    const valueChangeHandler = (e, item) => {
      dispatch({type: "CHANGE_AMOUNT", itemDetails: {
        item,
        // amount: +amount.current.value,
        amount: +e.target.value
    }});
    }

    return(
        <Fragment>
        {orderedItems.map((item) => (
             <Card className="m-2" key={props.id} style={{ width: "90%"}}>
             <Card.Body>
               <Card.Title><b>{item.name}</b></Card.Title>
               <Card.Text style={{}}>
               <Row>
                 <Col md={4}>
                 <Image src={item.image} rounded  style={{width:"50%", height:"80%"}}/>
                 </Col>
                 <Col md={4} style={{textAlign:"center"}}>
                   Ilość: <input
                   type="number"
                  //  value={item.itemAmount}
                  defaultValue={item.itemAmount}
                   min={1}
                   onChange={(e) => {
                    valueChangeHandler(e,item);
                   }}
                 />
                   </Col>
                 <Col md={4} style={{textAlign:"right"}}>
                 {item.price * item.itemAmount} zł
                 </Col>
               </Row>
               </Card.Text>
             </Card.Body>
           </Card>
        ))}
    </Fragment>
    )
}

export default OrderList;