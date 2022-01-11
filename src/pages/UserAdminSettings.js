import { useLocation } from "react-router";
import React, {useCallback, useState, Fragment} from 'react';
import { Card, TextField } from "@material-ui/core";
import { Button, Col, Row } from 'react-bootstrap';
import apiSpec from '../api/apiSpec';
import axios from 'axios';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const UserAdminSettings = () => {
    const jwt = useSelector(state => state.userLogin.jwt);
    const [user, setUser] = useState({});
    const [userToFind, setUserToFind] = useState('');
    const [isLoading, setIsLoading] = useState('true');
    const [foundUser, setFoundUser] = useState([]);



    const fetchSearchUsers = useCallback(async(parameter) =>{
        setIsLoading(false);
         const response = await axios({
             url: apiSpec.USERS_SEARCH.url,
             method: apiSpec.USERS_SEARCH.operation,
             headers: {
                // "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${jwt}`,
              },
              params:{
               parameter
          },
         })
         const data = response.data;
         setFoundUser(data);
         console.log(data);
         setIsLoading(true);
    });

    const handleInputState = (event) => {
        setUserToFind(event.target.value);
    }

    const fetchUsers = (event) => {
        fetchSearchUsers(userToFind);
    }

    return (
        <Fragment>
        <label style={{marginTop:'2%'}}><h3>Wpisz login użytkownika</h3></label><br/>
        <input type="text" name="productToDelete" onChange={handleInputState} value={userToFind}/> <Button onClick={fetchUsers}>Szukaj</Button>
        
        {isLoading && foundUser.map((data) => (
          <NavLink to={`/account/adm/users/${data.id}`} className="nav">
               <Card className="m-2" key={data.name} style={{ width: "100%", fontSize:'1.5rem'}}>
                     <Row>
                     <Col md={4} style={{textAlign:"center"}}>
                          Login: {data.username}
                    </Col>
                      <Col md={4} style={{textAlign:"center"}}>
                        Imię: {data.name}
                        </Col>
                          <Col md={4} style={{textAlign:"center"}}>
                        Naziwsko: {data.surname}
                          </Col>
                    </Row> 
            </Card>
            </NavLink>
        ))}
        </Fragment>
    )
}
export default UserAdminSettings;