
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

          {/* <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mr-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link href="#action1">Home</Nav.Link>
      <Nav.Link href="#action2">Link</Nav.Link>
      <NavDropdown title="Link" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#" disabled>
        Link
      </Nav.Link>
    </Nav>
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
          </Form>
             </Navbar.Collapse>
             </Navbar> */}
        </Fragment>
    );
};

export default HeaderNavigation;

