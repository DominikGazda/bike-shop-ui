import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { InfoCircleFill, CartFill, Screwdriver, Power } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";


// import Cloud from '@mui/icons-material/Cloud';

export default function UserAccountSidebar() {
    const dispatch = useDispatch();
    const history = useHistory();
    

    const logOut = () => {
        dispatch({type:"LOGOUT"});
        history.push('/home');
    }
    

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
      <Link to="/account/information" style={{textDecoration:'none', color:'black'}}>
        <MenuItem>
          <ListItemText>Informacje</ListItemText>
          <Typography variant="body2" color="text.secondary">
            <InfoCircleFill/>
          </Typography>
        </MenuItem>
        </Link>
        <Link to="/account/orders" style={{textDecoration:'none', color:'black'}}>
        <MenuItem>
          <ListItemText>Zamówienia</ListItemText>
          <Typography variant="body2" color="text.secondary">
            <CartFill/>
          </Typography>
        </MenuItem>
        </Link>
        <Link to="/account/options" style={{textDecoration:'none', color:'black'}}>
        <MenuItem>
          <ListItemText>Ustawienia</ListItemText>
          <Typography variant="body2" color="text.secondary">
            <Screwdriver/>
          </Typography>
        </MenuItem>
        </Link>
        <MenuItem onClick={logOut}>
          <ListItemText>Wyloguj</ListItemText>
          <Typography variant="body2" color="text.secondary">
            <Power/>
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}