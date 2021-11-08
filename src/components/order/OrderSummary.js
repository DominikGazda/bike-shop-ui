import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const OrderSummary = (props) => {
    const totalPrice = useSelector(state => state.items.itemsPrice);
    const [value, setValue] = React.useState('');
    const [deliveryStatus, setDeliveryStatus] = useState(true);
    const loggedIn = useSelector(state => state.userLogin.isLoggedIn);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const submitButtonHandler = () => {
        if(value === ''){
            setDeliveryStatus(false);
            return;
        }
        history.push("/order/client");
    }

    let deliveryCosts = <b></b>

    if(totalPrice < 20000){
        if(value === 'dpd'){
            deliveryCosts = <b>14,99 zł</b>
            dispatch({type: "UPDATE_DELIVERY_PRICE", itemDetails: {
                delivery:{
                    price: 14.99,
                    name: 'dpd'
                }
            }});
        } else if(value === 'inpost'){
            deliveryCosts = <b>12,99 zł</b>
            dispatch({type: "UPDATE_DELIVERY_PRICE", itemDetails: {
                delivery:{
                    price: 12.99,
                    name: 'inpost'
                }
            }});
        } else if (value === 'dhl'){
            deliveryCosts = <b>13,99 zł</b>
            dispatch({type: "UPDATE_DELIVERY_PRICE", itemDetails: {
                delivery:{
                    price: 13.99,
                    name: 'dhl'
                }
            }});
        }
    } else {
        deliveryCosts = <b style={{color:"green"}}>GRATIS</b>
        dispatch({type: "UPDATE_DELIVERY_PRICE", itemDetails: {
            delivery:{
                price: 0,
                name: 'GRATIS'
            }
        }});
    }



    return (
        <Row>
            <Col md={6} style={{textAlign:"center"}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Wybierz sposób dostawy</FormLabel>
                    <RadioGroup aria-label="courier" name="courier1" value={value} onChange={handleChange}>
                        <FormControlLabel value="dpd" control={<Radio />} label="Przesyłka kurierska (DPD)" />
                        <FormControlLabel value="inpost" control={<Radio />} label="Przesyłka kurierska (InPost)" />
                        <FormControlLabel value="dhl" control={<Radio />} label="Przesyłka kurierska (DHL)" />
                    </RadioGroup>
                    </FormControl>
                    {deliveryStatus === false && <p style={{backgroundColor:'red'}}>Wybierz dostawcę !</p>}
            </Col>
            <Col md={6} style={{textAlign:"left"}}>
                <b>Wartość produktów: {totalPrice}</b><br/>
                <b>Koszt dostawy: {deliveryCosts}</b>
                <hr/><br/>
                {loggedIn ?<Button onClick={submitButtonHandler}>Przejdź do zamówienia</Button> : <Button disabled={true}>Muisz być zalogowany żeby zamówić</Button>}
              <br/>
                Darmowa dostawa dla zamówień powyżej 20000 zł 
            </Col>
        </Row>
    );
}

export default OrderSummary;