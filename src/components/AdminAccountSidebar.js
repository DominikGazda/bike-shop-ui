import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { InfoCircleFill, CartFill, Screwdriver, Power, PlusCircleFill} from 'react-bootstrap-icons';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';


const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{ 
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

export default function AdminAccountSidebar() {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const logOut = () => {
        dispatch({type:"LOGOUT"});
        history.push('/home');
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
      <Link to="/account/adm/information" style={{textDecoration:'none', color:'black'}}>
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
        <MenuItem>
    
        <div style={{width:'100%', height:'100%', margin:'0',  padding:'0'}}>
      <Button
        // id="demo-customized-button"
        // aria-controls="demo-customized-menu"
        // aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        style={{width:'100%', height:'100%', color:'black', textAlign:'left', padding:'0', textTransform:'none'}}
      >
        <ListItemText>Dodaj</ListItemText>
        <Typography variant="body2" color="text.secondary">
        <PlusCircleFill/>
          </Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          Rowery
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Części
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Akcesoria
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Warsztat
        </MenuItem>
      </StyledMenu>
    </div>
        </MenuItem>
        <MenuItem>
          <ListItemText>Ustawienia</ListItemText>
          <Typography variant="body2" color="text.secondary">
            <Screwdriver/>
          </Typography>
        </MenuItem>
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