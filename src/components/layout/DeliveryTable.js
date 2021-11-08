import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { propTypes } from 'react-bootstrap/esm/Image';

const useStyles = makeStyles({
    table: {
      minWidth: "auto",
    },
  });


const DeliveryTable = (props) => {

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table" style={{padding:"10px"}}>
          <TableHead>
              <TableRow>
              <TableCell><b>{props.description}</b></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{props.delivery}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{props.sendDetails}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer> 
    )
}

export default DeliveryTable;