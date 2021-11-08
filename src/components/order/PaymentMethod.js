import React, { Fragment } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
                Tutaj grafika przelewy24
          </li>
          <li>
            <FormControlLabel value="tradycyjny" control={<Radio />} label="Przelew tradycyjny" />
                Tutaj grafika przelew tradycyjny 
          </li>
          <li>
            <FormControlLabel value="odbior" control={<Radio />} label="Płatność przy odbiorze" />   
                Tutaj grafika przy odbiorze
          </li>
        </RadioGroup>
        </ul>
        </FormControl>
       </Fragment>
    )
}
export default PaymentMethod;