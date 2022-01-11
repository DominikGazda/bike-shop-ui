
import { Fragment } from 'react';
import { Form, FormControl, Nav, Navbar, NavDropdown , Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './HeaderNavigation.module.css';

const HeaderNavigation = () => {
  const isAdmin = useSelector(state => state.userLogin.isAdmin);

    return (
        <Fragment>
            <hr/>
            {!isAdmin &&
              <div className={classes['header-nav']}>
                <NavLink to='/bikes' activeClassName={classes.active}>Rowery</NavLink>
                <NavLink to='/parts' activeClassName={classes.active}>Części</NavLink>
                <NavLink to='/accessories' activeClassName={classes.active}>Akcesoria</NavLink>
                <NavLink to='/workshop' activeClassName={classes.active}>Warsztat</NavLink>
          </div> }
          <hr/>
        </Fragment>
    );
};

export default HeaderNavigation;

