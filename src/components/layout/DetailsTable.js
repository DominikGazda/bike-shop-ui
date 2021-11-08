import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: "auto",
  },
});

const DetailsTable = (props) => {

    const classes = useStyles();
    const item = props.item;

    console.log(item);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table" style={{padding:"10px"}}>
        <TableHead>
            <TableRow>
            <TableCell>Kolor</TableCell>
            <TableCell align="right">{item.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rozmiar koła</TableCell>
            <TableCell align="right">27,5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rozmiar ramy</TableCell>
            <TableCell align="right">20,5</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );

}

export default DetailsTable;