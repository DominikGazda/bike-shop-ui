import { Fragment } from 'react';
import { Col } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from "react";
import BikesList from '../components/bikes/BikesList'
import axios from 'axios';
import { useSelector } from 'react-redux';
const Bikes = () => {
    const [bikesData, setBikesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const filteredDataFlag = useSelector(state => state.fetchBikeDataListFlag.flag);
    const filteredDataParameter = useSelector(state => state.fetchBikeDataListFlag.value);
    const filteredItem = useSelector(state => state.fetchBikeDataListFlag.item)

    let url = null;
    let method = 'GET';

    if(filteredDataFlag === true){
        url = "http://localhost:8765/api/bikes";
    } else {
        if(Object.keys(filteredItem).length !== 0 && filteredDataParameter === undefined){
            url = `http://localhost:8765/api/bikes/sort`;
            method = 'POST';
        } else {
            url = `http://localhost:8765/api/bikes/sort/name?&parameter=${filteredDataParameter}`;
           
        }
    }

    const fetchApi = async() =>{
        try{
          setIsLoading(true);
          const response = await axios({
              method:method,
              url:url,
              headers :{
                'Content-Type': 'application/json',
            },
              data:filteredItem
          });
          const data = response.data;
          setBikesData(data);
          setIsLoading(false);
      } catch(error){
       }
    }

      
    // const fetchApi = async(name) => {
    //     const response = await axios(`http://localhost:8765/api/bikes/sort?type=name&parameter=${name}`);
    //     const data = response.data;
    // } 


      useEffect(() => {
        fetchApi();
      },[url,filteredItem]);
    


    return(
        !isLoading && <BikesList bikesData={bikesData}/>
    )
}

export default Bikes;