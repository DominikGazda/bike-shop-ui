import {
  makeStyles,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Fragment, useReducer, useState } from "react";
import { Card, Col, Table } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import SearchBar from "material-ui-search-bar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { useDispatch } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const reducer = (state, action) => {
  switch (action.type) {
    case "kands":
      return {
        ...state,
        kands: !state.kands,
      };
    case "merida":
      return {
        ...state,
        merida: !state.merida,
      };
    case "cross":
      return {
        ...state,
        cross: !state.cross,
      };
    case "bmx":
      return {
        ...state,
        bmx: !state.bmx,
      };
    case "black":
      return {
        ...state,
        black: !state.black,
      };
    case "white":
      return {
        ...state,
        white: !state.white,
      };
    case "blue":
      return {
        ...state,
        blue: !state.blue,
      };
    case "red":
      return {
        ...state,
        red: !state.red,
      };
    case "gray":
      return {
        ...state,
        gray: !state.gray,
      };
    case "navy":
      return {
        ...state,
        navy: !state.navy,
      };
    case "frame26":
      return {
        ...state,
        frame26: !state.frame26,
      };
    case "frame27":
      return {
        ...state,
        frame27: !state.frame27,
      };
    case "frame28":
      return {
        ...state,
        frame28: !state.frame28,
      };
    case "frame29":
      return {
        ...state,
        frame29: !state.frame29,
      };
    case "man":
      return {
        ...state,
        man: !state.man,
      };
    case "woman":
      return {
        ...state,
        woman: !state.woman,
      };
    case "lowPrice":
      return {
        ...state,
        lowPrice: Number(action.value),
      };
    case "highPrice":
      return {
        ...state,
        highPrice: Number(action.value),
      };
    default:
      throw new Error();
  }
};

const initialState = {
  kands: false,
  merida: false,
  cross: false,
  bmx: false,
  black: false,
  white: false,
  blue: false,
  red: false,
  gray: false,
  navy: false,
  frame26: false,
  frame27: false,
  frame28: false,
  frame29: false,
  man: false,
  woman: false,
  lowPrice: 0,
  highPrice: 0,
};

const CustomBikeSidebar = (props) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatchRedux = useDispatch();
  //reducer dla formularza
  const [state, dispatch] = useReducer(reducer, initialState);

  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.name === "lowPrice" || e.target.name === "highPrice") {
      dispatch({ type: e.target.name, value: e.target.value });
    } else {
      dispatch({ type: e.target.name });
    }
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    if (state.lowPrice > state.highPrice) {
      setOpen(true);
      return;
    }

    const filterResponse = {
      mark: {
        kands: state.kands,
        merida: state.merida,
        cross: state.cross,
        trek: state.trek,
        cannondale: state.cannondale,
      },
      color: {
        black: state.black,
        white: state.white,
        blue: state.blue,
        red: state.red,
        gray: state.gray,
        navy: state.navy,
      },
      frame: {
        frame26: state.frame26,
        frame27: state.frame27,
        frame28: state.frame28,
        frame29: state.frame29,
      },
      gender: {
        man: state.man,
        woman: state.woman,
      },
      price: {
        lowPrice: state.lowPrice,
        highPrice: state.highPrice,
      },
    };

    dispatchRedux({
      type: "FETCH_FILTERED_BIKES",
      flag: false,
      item: filterResponse,
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSearchFieldChange = (newValue) => {
    setSearchValue(newValue);
    if (newValue !== "") {
      dispatchRedux({
        type: "FETCH_FILTERED_BIKES",
        flag: false,
        value: newValue,
        item: {},
      });
    } else {
      dispatchRedux({
        type: "FETCH_FILTERED_BIKES",
        flag: true,
        value: "",
        item: {},
      });
    }
  };

  return (
    <Fragment>
      <Col md={4}>
        <Card className="m-4" style={{ width: "16rem" }}>
          <TableContainer>
            <Table
              size="small"
              aria-label="a dense table"
              style={{ padding: "10px" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Marka:</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <div style={{ height: "100%", overflow: "auto" }}>
                    <TableCell>
                      <TableRow>
                        Kands{" "}
                        <Checkbox
                          checked={state.kands}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name="kands"
                        />
                        Merida{" "}
                        <Checkbox
                          checked={state.merida}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name="merida"
                        />
                      </TableRow>
                      <TableRow>
                        Cross{" "}
                        <Checkbox
                          checked={state.cross}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name="cross"
                        />
                        Cannondale{" "}
                        <Checkbox
                          checked={state.cannondale}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name="bmx"
                        />
                      </TableRow>
                      <TableRow>
                        Trek{" "}
                        <Checkbox
                          checked={state.trek}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name="cross"
                        />
                      </TableRow>
                    </TableCell>
                  </div>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Kolor:</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <div style={{ height: "70px", overflow: "auto" }}>
                    <TableCell>
                      <TableRow>
                        Czarny{" "}
                        <Checkbox
                          checked={state.black}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"black"}
                        />
                      </TableRow>
                      <TableRow>
                        Biały{" "}
                        <Checkbox
                          checked={state.white}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"white"}
                        />
                      </TableRow>
                      <TableRow>
                        Niebieski{" "}
                        <Checkbox
                          checked={state.blue}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"blue"}
                        />
                      </TableRow>
                      <TableRow>
                        Czerwony{" "}
                        <Checkbox
                          checked={state.red}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"red"}
                        />
                      </TableRow>
                      <TableRow>
                        Szary{" "}
                        <Checkbox
                          checked={state.gray}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"gray"}
                        />
                      </TableRow>
                      <TableRow>
                        Granatowy{" "}
                        <Checkbox
                          checked={state.navy}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"navy"}
                        />
                      </TableRow>
                    </TableCell>
                  </div>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Rozmiar ramy:</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <div style={{ height: "100%", overflow: "auto" }}>
                    <TableCell>
                      <TableRow>
                        26{" "}
                        <Checkbox
                          checked={state.frame26}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"frame26"}
                        />
                        27{" "}
                        <Checkbox
                          checked={state.frame27}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"frame27"}
                        />
                      </TableRow>
                      <TableRow>
                        28{" "}
                        <Checkbox
                          checked={state.frame28}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"frame28"}
                        />
                        29{" "}
                        <Checkbox
                          checked={state.frame29}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"frame29"}
                        />
                      </TableRow>
                    </TableCell>
                  </div>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Płeć:</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <div style={{ height: "100%", overflow: "auto" }}>
                    <TableCell>
                      <TableRow>
                        Mężczyzna{" "}
                        <Checkbox
                          checked={state.man}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"man"}
                        />
                        Kobieta{" "}
                        <Checkbox
                          checked={state.woman}
                          onChange={handleChange}
                          size={"small"}
                          inputProps={{ "aria-label": "primary checkbox" }}
                          name={"woman"}
                        />
                      </TableRow>
                    </TableCell>
                  </div>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Cena:</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <div style={{ height: "100%", overflow: "auto" }}>
                    <TableCell>
                      <TableRow>
                        <input
                          type="number"
                          min={0}
                          style={{ width: "40%" }}
                          placeholder="Min"
                          onChange={handleChange}
                          name={"lowPrice"}
                        />
                        <input
                          type="number"
                          min={0}
                          style={{ width: "40%", marginLeft: "5px" }}
                          placeholder="Max"
                          onChange={handleChange}
                          name={"highPrice"}
                        />
                      </TableRow>
                    </TableCell>
                  </div>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmitButton}
                    >
                      Filtruj
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <SearchBar
                      value={searchValue}
                      onChange={(newValue) => handleSearchFieldChange(newValue)}
                      placeholder="Szukaj"
                      onCancelSearch={() => setSearchValue("")}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Card>
      </Col>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        style={{ zIndex: "2" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          style={{ zIndex: "1000", position: "relative" }}
        >
          Cena minimalna nie może być większa od maksymalnej
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default CustomBikeSidebar;
