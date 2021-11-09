import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Bikes from "./pages/Bikes";
import Parts from "./pages/Parts";
import Accessories from "./pages/Accessories";
import Workshop from "./pages/Workshop";
import { Container, Row, Col } from "react-bootstrap";
import HeaderNavigation from "./components/layout/HeaderNavigation";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/MainSidebar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ItemDetails from "./pages/ItemDetails";
import { Fragment, useState } from "react";
import ModalCard from "./components/UI/ModalCard";
import { Provider } from "react-redux";
import store from "./store";
import OrderDetails from "./pages/OrderDetails";
import OrderClientDetails from "./pages/OrderClientDetails";
import OrderSummary from "./pages/OrderSummary";
import CustomBikeSidebar from "./components/bikes/CustomBikeSidebar";
import CustomPartsSidebar from "./components/parts/CustomPartsSidebar";
import Login from "./pages/Login";
import UserAccount from "./pages/UserAccount";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminAccount from "./pages/AdminAccount";

function App() {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <Provider store={store}>
      <Fragment>
        {showModal && <ModalCard onHideModal={hideModalHandler} />}

        <Container fluid>
          <Row>
            <Header onShowModal={showModalHandler} />
          </Row>
          <Row className="justify-content-md-center">
            <HeaderNavigation />
          </Row>
          <Row>
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path = "/account/adm">
                <AdminAccount/>
                </Route>
              <Route path = "/account" >
                <UserAccount/>
              </Route>
            
              <Route path = "/login/adm" exact>
                <Login/>
                </Route>
              <Route path="/order/client/summary" exact>
                <OrderSummary />
              </Route>
              <Route path="/order/client" exact>
                <OrderClientDetails/>
              </Route>
              <Route path="/order">
                <OrderDetails/>
              </Route>
              <Route path="/bikes" exact>
                <Col md={3} >
                <div style={{position:'sticky', top:'0'}}>
                  <CustomBikeSidebar />
                  </div>
                </Col>
                <Col md={9} >
                  <Bikes />
                </Col>
              </Route>
              <Route path="/parts" exact>
                <Col md={3}>
                <div style={{position:'sticky', top:'0'}}>
                  <CustomPartsSidebar />
                  </div>
                </Col>
                <Col md={9}>
                  <Parts />
                </Col>
              </Route>
              <Route path="/accessories" exact>
                <Col md={3}>
                  <Sidebar />
                </Col>
                <Col md={9}>
                  <Accessories />
                </Col>
              </Route>
              <Route path="/workshop" exact>
                <Col md={3}>
                  <Sidebar />
                </Col>
                <Col md={9}>
                  <Workshop />
                </Col>
              </Route>
              <Route path="/" exact>
                <Redirect to="/home" />
              </Route>
              <Route path="/:type/:name">
                <ItemDetails />
              </Route>
              <Route path="/register" exact>
                <RegisterPage/>
              </Route>
              <Route path="/login" exact>
                <LoginPage/>
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Row>
          <Row>
            <Footer />
          </Row>
        </Container>
      </Fragment>
    </Provider>
  );
}

export default App;
