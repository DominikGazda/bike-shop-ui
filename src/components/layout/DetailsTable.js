import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: "auto",
  },
});

const DetailsTable = (props) => {
  const classes = useStyles();
  const item = props.item;

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        size="small"
        aria-label="a dense table"
        style={{ padding: "10px" }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Marka</TableCell>
            <TableCell align="right">{item.mark}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kolor</TableCell>
            <TableCell align="right">{item.color}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dostępna ilość</TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default DetailsTable;
