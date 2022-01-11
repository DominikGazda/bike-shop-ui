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
import AdminOrders from "./AdminOrders";
import SingleOrderDetails from "./SingleOrderDetails";
import AddBike from "./AddBike";
import AddParts from "./AddParts";
import AddAccessories from "./AddAccessories";
import AddWorkshop from "./AddWorkshop";
import DeleteItem from "./DeleteItem";
import ModifyBike from "./ModifyBike";
import ModifyParts from "./ModifyParts";
import ModifyAccessories from "./ModifyAccessories";
import ModifyWorkshop from "./ModifyWorkshop";
import ModifyItem from "./ModifyItem";
import UserAdminSettings from "./UserAdminSettings";
import SingleUserDetails from "./SingleUserDetails";



const AdminAccount = (props) => {
    const loggedIn = useSelector(state => state.userLogin.isLoggedIn);
    const showDeleteModal = useSelector(state => state.modalHandler.showModal);
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

    const fetchOrders = useCallback(async() => {
        const response = await axios.get(apiSpec.ADMIN_ORDER.url);
        const data = response.data;
        setOrders(data);
    })

    useState(() => {
        fetchApi();
        fetchOrders();
    },[])
    
    if(showDeleteModal){
        props.onShowModal();
    }

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
                {/* <UserOrders /> 
                 */}
                 <AdminOrders orders={orders}/>
            </Route>
            <Route path="/account/adm/orders/:orderId" exact>
                {/* <UserOrders /> 
                 */}
                 <SingleOrderDetails />
            </Route>
            <Route path="/account/adm/add/bikes" exact>
                <AddBike/>
            </Route>
            <Route path="/account/adm/add/parts" exact>
                <AddParts/>
            </Route>
            <Route path="/account/adm/add/accessories" exact>
                <AddAccessories/>
            </Route>
            <Route path="/account/adm/add/workshop" exact>
                <AddWorkshop />            
            </Route>
            <Route path="/account/adm/delete/bikes" exact>
                <DeleteItem />
            </Route>
             <Route path="/account/adm/delete/parts" exact>
                <DeleteItem />
            </Route>
             <Route path="/account/adm/delete/accessories" exact>
                <DeleteItem />
            </Route>
             <Route path="/account/adm/delete/workshop" exact>   
                <DeleteItem /> 
            </Route> 
            <Route path="/account/adm/modify/bikes" exact>
                <ModifyItem />
            </Route>
             <Route path="/account/adm/modify/parts" exact>
                <ModifyItem />
            </Route>
             <Route path="/account/adm/modify/accessories" exact>
                <ModifyItem />
            </Route>
             <Route path="/account/adm/modify/workshop" exact>   
                <ModifyItem /> 
            </Route>
            <Route path="/account/adm/modify/bikes/:name" exact>   
                <ModifyBike /> 
            </Route> 
            <Route path="/account/adm/modify/parts/:name" exact>   
                <ModifyParts /> 
            </Route> 
            <Route path="/account/adm/modify/accessories/:name" exact>   
                <ModifyAccessories /> 
            </Route> 
            <Route path="/account/adm/modify/workshop/:name" exact>   
                <ModifyWorkshop /> 
            </Route>  
            <Route path="/account/adm/users" exact>
                <UserAdminSettings/>
            </Route>
            <Route path="/account/adm/users/:id" exact>
                <SingleUserDetails userDetails={user}/>
            </Route>
        </Switch>
          </Col>
      </Row>
    )
}
export default AdminAccount;