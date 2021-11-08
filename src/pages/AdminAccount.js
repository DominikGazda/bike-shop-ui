
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import UserInformation from "./UserInformation";
import UserOrders from "./UserOrders";
const AdminAccount = (props) => {
    const loggedIn = useSelector(state => state.userLogin.isLoggedIn);
    const login = useSelector(state => state.userLogin.login);
    const password = useSelector(state => state.userLogin.password);
    const jwt = useSelector(state => state.userLogin.jwt);

    return (
      <Row>
          <Col md={3}>
             <NavLink to="/account/information/adm">Informacje</NavLink>
             <br/>
             <NavLink to="/account/orders/adm">Zamówienia</NavLink>
          </Col>
          <Col md={9}>
          <Switch> 
            <Route path="/account/information/adm" exact>
                <UserInformation/>
            </Route>
            <Route path="/account/orders/adm" exact>
                <UserOrders/>
            </Route>
        </Switch>
          </Col>
      </Row>
    )
}
export default AdminAccount;