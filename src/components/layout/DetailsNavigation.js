import { Col, Row } from "react-bootstrap";
import classes from './DetailsNavigation.module.css';
import { NavLink, useLocation } from "react-router-dom";

const DetailsNavigation = (props) => {

    return (
        <Row >
            <Col md={12}>
            <div className={classes.nav}>
            <NavLink to={`/${props.mainUrl}/opis`} activeClassName={classes.active} >Opis</NavLink>
            <NavLink to={`/${props.mainUrl}/specyfikacja`} activeClassName={classes.active}>Specyfikacja</NavLink>
            <NavLink to={`/${props.mainUrl}/dostawa`} activeClassName={classes.active}>Dostawa</NavLink>
            </div>
            </Col>
        </Row>
    
    )};

export default DetailsNavigation;