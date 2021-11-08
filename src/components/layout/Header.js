import { AccountCircle } from "@material-ui/icons";
import { Fragment } from "react";
import { Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";


const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <NavLink className={classes.nav} to="/home">
          <h1>Bike shop</h1>
        </NavLink>
        <HeaderCartButton onShowModal = {props.onShowModal}/>
        <Link to="/login">
        <AccountCircle style={{width:'10%', height:'100%', margin:'0'}}/>
       </Link>
      </header>
    </Fragment>
  );
};

export default Header;
