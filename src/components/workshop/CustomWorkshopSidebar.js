import { makeStyles, Paper, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Fragment, useReducer, useState } from "react";
import { Card, Col, Table } from "react-bootstrap";
import Checkbox from '@material-ui/core/Checkbox';
import SearchBar from "material-ui-search-bar";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import { useDispatch } from "react-redux";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const reducer = (state, action) => {
    switch(action.type){
        case 'maintenance':
            return {
                ...state,
                maintenance: !state.maintenance
            };
        case 'racks':
            return {
                ...state,
                racks: !state.racks
            };
        case 'tools':
            return {
                ...state,
                tools: !state.tools
            };
        case 'kands':
            return {
                ...state,
                kands: !state.kands
            } 
        case 'merida':
            return {
                ...state,
                merida: !state.merida
            }     
        case 'trec':
            return {
                ...state,
                trec: !state.trec
            }
        case 'test2':
            return {
                ...state,
                test2: !state.test2
            }
        case 'lowPrice':
            return {
                ...state,
                lowPrice: Number(action.value)
            } 
        case 'highPrice':
            return {
                ...state,
                highPrice: Number(action.value)
            }                                                                          
        default:
            throw new Error();    
    }
}

const initialState = {maintenance:false, racks:false, tools:false,
                      kands:false, merida:false, trec:false, test2:false, lowPrice:0, highPrice:0};

const CustomWorkshopSidebar = (props) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const dispatchRedux = useDispatch();
    //reducer dla formularza
    const [state, dispatch] = useReducer(reducer, initialState);

    const classes = useStyles();

    const handleChange = (e) => {
        console.log(e.target.name);
        if(e.target.name === 'lowPrice' || e.target.name === 'highPrice'){
            dispatch({type:e.target.name, value:e.target.value})
        } else {
            dispatch({type:e.target.name});
        }
    }

    const handleSubmitButton = (e) => {
        e.preventDefault();
        if(state.lowPrice > state.highPrice){
            setOpen(true);
            return;
        }
        
        const filterResponse = {
            type:{
                maintenance: state.maintenance,
                racks: state.racks,
                tools: state.tools
            },
            mark:{
                kands: state.kands,
                merida: state.merida,
                trec: state.trec,
                test2: state.test2
            },
            price: {
                lowPrice: state.lowPrice,
                highPrice: state.highPrice
            }
    }
        console.log(filterResponse);
        dispatchRedux({type:'FETCH_FILTERED_WORKSHOP', flag:false, item:filterResponse});
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const handleSearchFieldChange = (newValue) => {
        setSearchValue(newValue);
        if(newValue !== ''){
            dispatchRedux({type:'FETCH_FILTERED_WORKSHOP', flag:false, value:newValue, item:{}});
        } else {
            dispatchRedux({type:'FETCH_FILTERED_WORKSHOP', flag:true, value:'', item:{}});
        }
    }

    return(
        <Fragment>
            <Col md={4}>
            <Card className="m-4"  style={{ width: "16rem"}}>
            <TableContainer >
                <Table size="small" aria-label="a dense table" style={{padding:"10px"}}>
                <TableHead>
                    <TableRow>
                    <TableCell><b>Typ:</b></TableCell>       
                    </TableRow>
                    <TableRow >
                    <div style={{ height: "100%", overflow: "auto" }} >
                    <TableCell>
                        <TableRow>
                                Konserwacja<Checkbox
                                checked={state.bags}
                                onChange={handleChange}
                                size={'small'}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                name='maintenance'
                            />
                                Stojaki <Checkbox
                                checked={state.bottles}
                                onChange={handleChange}
                                size={'small'}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                name='racks'
                            />
                        </TableRow>
                        <TableRow>
                                Narz??dzia <Checkbox
                                checked={state.fenders}
                                onChange={handleChange}
                                size={'small'}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                name='tools'
                            />
                        </TableRow>
                    </TableCell>
                    </div>
                    </TableRow>
                    <TableRow>
                     <TableCell><b>Marka:</b></TableCell>       
                    </TableRow> 
                    <TableRow >
                    <div style={{ height: "100%", overflow: "auto" }} >
                    <TableCell>
                        <TableRow>
                                Kands <Checkbox
                                checked={state.kands}
                                onChange={handleChange}
                                size={'small'}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                name={'kands'}
                            />
                                Merida <Checkbox
                                checked={state.merida}
                                onChange={handleChange}
                                size={'small'}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                name={'merida'}
                            />
                        </TableRow>
                        <TableRow>
                                Trec <Checkbox
                                checked={state.trec}
                                onChange={handleChange}
                                size={'small'}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                name={'trec'}
                            />
                                Test <Checkbox
                                checked={state.test2}
                                onChange={handleChange}
                                size={'small'}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                name={'test2'}
                            />
                        </TableRow>
                    </TableCell>
                    </div>
                    </TableRow>
                    <TableRow>
                     <TableCell><b>Cena:</b></TableCell>       
                    </TableRow>
                    <TableRow >
                    <div style={{ height: "100%", overflow: "auto" }} >
                    <TableCell>
                        <TableRow>
                            <input type="number" min={0} style={{width:'40%'}} placeholder="Min" onChange={handleChange} name={'lowPrice'}/>
                            <input type="number" min={0} style={{width:'40%', marginLeft:'5px'}} placeholder="Max" onChange={handleChange} name={'highPrice'}/>
                        </TableRow>
                    </TableCell>
                    </div>
                    </TableRow>
                    <TableRow>
                     <TableCell>
                        <button className="btn btn-primary" onClick={handleSubmitButton}>Filtruj</button>
                     </TableCell>       
                    </TableRow>
                    <TableRow>
                     <TableCell>
                         <SearchBar
                            value={searchValue}
                            onChange={(newValue) => handleSearchFieldChange(newValue)}
                            placeholder="Szukaj"
                            onCancelSearch={() => setSearchValue('')}
                        />
                     </TableCell>       
                    </TableRow>
                </TableHead>
                </Table>
            </TableContainer> 
          </Card>
          </Col>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar} style={{zIndex:'2'}}>
            <Alert onClose={handleCloseSnackbar} severity="warning" style={{zIndex:'1000', position:'relative'}}>
                Cena minimalna nie mo??e by?? wi??ksza od maksymalnej
          </Alert>
      </Snackbar>
        </Fragment>
    )
}
export default CustomWorkshopSidebar;