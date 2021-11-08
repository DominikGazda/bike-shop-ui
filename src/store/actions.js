import React from 'react';
import axios from 'axios';

export default function addOrder(order){
    console.log('test');
    return function(dispatch){
        dispatch({type:'ADD_ORDER'})
    }
}