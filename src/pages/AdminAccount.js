import UserAccountSidebar from "../components/UserAccountSidebar";

import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import UserInformation from "./UserInformation";
import UserOrders from "./UserOrders";
import AdminAccountSidebar from "../components/AdminAccountSidebar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useCallback, useState } from "react";
import apiSpec from '../api/apiSpec';
const AdminAccount = (props) => {
    const loggedIn = useSelector(state => state.userLogin.isLoggedIn);
    const login = useSelector(state => state.userLogin.login);
    const password = useSelector(state => state.userLogin.password);
    const jwt = useSelector(state => state.userLogin.jwt);
    const {sub: username} = jwt_decode(jwt);

    const [user, setUser] = useState({});

    const fetchApi = useCallback(async() => {
        const response = await axios.get(apiSpec.USER_DETAILS.url, {params:{username}})
        const data = response.data;
        setUser(data);
    });

    useState(() => {
        fetchApi();
    },[])

    return (
      <Row>
         <Col md={3}>
              <AdminAccountSidebar/>
          </Col>
          <Col md={9}>
          <Switch> 
            <Route path="/account/adm/information" exact>
                <UserInformation userDetails={user}/>
            </Route>
            <Route path="/account/adm/orders" exact>
                <UserOrders /> 
                {/* //userOrders */}
            </Route>
        </Switch>
          </Col>
      </Row>
    )
}
export default AdminAccount;