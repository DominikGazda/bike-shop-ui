import React, { Fragment, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';

const OrderAgreements = (props) => {
    
      return (
        <div style={{backgroundColor:"white"}}>
            <h1>Zgody</h1>
            <FormControlLabel control={
                    <Checkbox
                    checked={props.statute}
                    onChange={props.handleStatuteChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            }
            label="*Akceptuję regulamin sklepu BikeShop oraz politykę prywatności, w której zawarto obowiązek informacyjny związany z przetwarzaniem danych osobowych"
            />
            <br/>
            
            <FormControlLabel control={
                        <Checkbox
                        checked={props.newsletter}
                        onChange={props.handleNewsletterChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                }
                label="Wyrażam zgodę na przesyłanie przez BikeShop na mój email informacji marketingowych i handlowych"
            />           
        </div>
    )
}
export default OrderAgreements;