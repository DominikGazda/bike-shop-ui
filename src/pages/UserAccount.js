import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import DeliveryDescription from "./DeliveryDescription";
import UserInformation from "./UserInformation";
import UserOrders from "./UserOrders";
import UserAccountSidebar from "../components/UserAccountSidebar";
import jwt_decode from "jwt-decode";
import { useCallback, useState } from "react";
import axios from "axios";
import apiSpec from '../api/apiSpec';

const UserAccount = (props) => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.userLogin.isLoggedIn);
    const login = useSelector(state => state.userLogin.login);
    const password = useSelector(state => state.userLogin.password);
    const jwt = useSelector(state => state.userLogin.jwt);
    const {sub: username} = jwt_decode(jwt);
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState({});
   

    const fetchApi = useCallback(async() => {
        const response = await axios.get(apiSpec.USER_DETAILS.url, {params:{username}})
        const data = response.data;
        setUser(data);
    });

    const fetchUserOrders = useCallback(async() => {
        const response = await axios.get(apiSpec.USER_ORDER.url,{
            headers:{
                'Authorization':`Bearer ${jwt}`
            }
        })
        
        const data = response.data;
        setOrders(data);
    })

    useState(() => {
        fetchApi();
        fetchUserOrders();
    },[]);

    return (
      <Row>
          <Col md={3}>
              <UserAccountSidebar/>
          </Col>
          <Col md={9}>
          <Switch> 
            <Route path="/account/information" exact>
                <div style={{marginLeft:'10%'}}>
                <UserInformation userDetails={user}/>
                </div>
            </Route>
            <Route path="/account/orders" exact>
                <UserOrders userOrders={orders}/>
            </Route>
        </Switch>
          </Col>
          
      </Row>
    )
}
export default UserAccount;