import React, { Fragment } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useState ,useCallback} from 'react';
import axios from 'axios';
import apiSpec from '../../api/apiSpec';
import { useSelector } from "react-redux";

const PaymentMethod = (props) => {
    const [value, setValue] = React.useState('przelewy24');


    const handleChange = (event) => {
        setValue(event.target.value);
      };

    return(
       <Fragment> 
        <h1>Wybierz sposób płatności</h1>
        <FormControl component="fieldset">
        <ul style={{listStyleType:"none"}}>
        <RadioGroup aria-label="paymentMethod" name="paymentMethod" value={value} onChange={handleChange}>
          <li>
            <FormControlLabel value="przelewy24" control={<Radio />} label="Przelewy24 "/>
                <img src="../../assets/przelewy24_logo.png" style={{width:'15%'}}/>
          </li><br/>
          <li>
            <FormControlLabel value="tradycyjny" control={<Radio />} label="Przelew tradycyjny" />
                <img src="../../assets/przelew_tradycyjny.png" style={{width:'15%'}} />
          </li>
          <li>
            <FormControlLabel value="odbior" control={<Radio />} label="Płatność przy odbiorze" />   
                <img src="../../assets/za pobraniem.png"  style={{width:'15%'}}/>
          </li>
        </RadioGroup>
        </ul>
        </FormControl>
       </Fragment>
    )
}
export default PaymentMethod;