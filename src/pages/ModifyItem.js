import { useLocation } from "react-router";
import React, {useCallback, useState, Fragment} from 'react';
import { Card, TextField } from "@material-ui/core";
import { Button, Col, Row } from 'react-bootstrap';
import apiSpec from '../api/apiSpec';
import axios from 'axios';
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ModifyItem = (props) => {

    const location = useLocation();
    const type = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
    const [foundProduct, setFoundProduct] = useState([]);
    const [productToFind, setProductToFind] = useState('');
    const [isLoading, setIsLoading] = useState('true');

    useEffect(() => {
        setFoundProduct([]);
        setProductToFind('');
    },[type])
    console.log(type);
    const fetchSearchProducts = useCallback(async(parameter) =>{
        setIsLoading(false);
         const response = await axios.get(type === 'parts' ?apiSpec.BIKE_NAMES_CONTAINS.url.replace("bikes",'bike/parts') : apiSpec.BIKE_NAMES_CONTAINS.url.replace("bikes",type), {params:{parameter}});
         const data = response.data;
         if(type !== 'bikes'){
            setFoundProduct(data.flat());
         } else {
             setFoundProduct(data);
         }
         setIsLoading(true);
    });

    const fetchProducts = (event) => {
        fetchSearchProducts(productToFind);
    }

    const handleInputState = (event) => {
        setProductToFind(event.target.value);
    }



    return (
        <Fragment>
        {/* <Card style={{height:'100%', width:'100%', marginTop:'4%', borderRadius:'25px', padding:'1%'}}> */}
        <label style={{marginTop:'2%'}}><h3>Wpisz nazwę towaru do modyfikacji</h3></label><br/>
        <input type="text" name="productToDelete" onChange={handleInputState} value={productToFind}/> <Button onClick={fetchProducts}>Szukaj</Button>
        
        {isLoading && type === 'bikes' && foundProduct.map((data) => (
               <Card className="m-2" key={data.name} style={{ width: "100%"}}>
                     <Row>
                     <Col md={2} style={{textAlign:"center"}}>
                          Nazwa: {data.name}
                    </Col>
                      <Col md={2} style={{textAlign:"center"}}>
                        Ilość: {data.quantity}
                        </Col>
                          <Col md={2} style={{textAlign:"center"}}>
                           Typ: {data.bikeType}
                          </Col>
                          <Col md={2} style={{textAlign:"right"}}>
                           Cena: {data.price} zł
                      </Col>
                      <Col md={2} style={{textAlign:"right"}}>
                      <Link to={`/account/adm/modify/${type}/${data.name}`}>
                      <Button variant="success">Modyfikuj</Button>
                      </Link>
                      </Col>
                    </Row> 
            </Card>
        
        ))}
              {isLoading && type !== 'bikes' && foundProduct.map((data) => (
               <Card className="m-2" key={data.name} style={{ width: "100%"}}>
                     <Row>
                     <Col md={2} style={{textAlign:"center"}}>
                          Nazwa: {data.name}
                    </Col>
                      <Col md={2} style={{textAlign:"center"}}>
                        Ilość: {data.quantity}
                        </Col>
                          <Col md={2} style={{textAlign:"center"}}>
                           Typ: {data.bikeType}
                          </Col>
                          <Col md={2} style={{textAlign:"right"}}>
                           Cena: {data.price} zł
                      </Col>
                      <Col md={2} style={{textAlign:"right"}}>
                    <Link to={`/account/adm/modify/${type}/${data.name}`}>
                      <Button variant="success">Modyfikuj</Button>
                    </Link>  
                      </Col>
                    </Row> 
            </Card>
        
        ))}
        </Fragment>    
    )
}
export default ModifyItem;