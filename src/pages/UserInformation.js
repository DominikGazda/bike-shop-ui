import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserInformation = (props) => {

    const user = {...props.userDetails};
    console.log(user);
    return (
        <TableContainer component={Paper} style={{width:'45%'}}>
        <Table sx={{ minWidth: 500, maxWidth:300}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}}>Login</TableCell>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="right">{user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="left">Hasło</TableCell>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="right">{user.password}</TableCell>
            </TableRow>              
            <TableRow>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="left">Imię</TableCell>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="right">{user.name}</TableCell>
            </TableRow>
            <TableRow>  
                <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="left">Nazwisko</TableCell>
                <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="right">{user.surname}</TableCell>
            </TableRow>
            <TableRow>  
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="left">Ulica</TableCell>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="right">{user.street}</TableCell>
            </TableRow>
            <TableRow>  
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="left">Numer domu / Numer lokalu</TableCell>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="right">{user.houseNumber} / {user.localNumber}</TableCell>
            </TableRow>  
            <TableRow>  
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="left">Kod pocztowy</TableCell>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="right">{user.postalCode} {user.city}</TableCell>
            </TableRow>
            <TableRow>  
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="left">E - mail</TableCell>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="right">{user.email}</TableCell>
            </TableRow> 
            <TableRow> 
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="left">Numer telefonu</TableCell>
              <TableCell style={{fontSize:'20px', fontFamily:'arial'}} align="right">{user.phone}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    )
}
export default UserInformation;