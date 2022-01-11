import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccessoriesList from "../components/accesories/AccessoriesList";

const Accessories = () => {
    const [accessoriesData, setAccessoriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const filteredDataFlag = useSelector(state => state.fetchAccessoriesListFlag.flag);
    const filteredDataParameter = useSelector(state => state.fetchAccessoriesListFlag.value);
    const filteredItem = useSelector(state => state.fetchAccessoriesListFlag.item);

    let url = null;
    let method = 'GET';
    
    console.log('siema')

    if(filteredDataFlag === true){
        url = "http://localhost:8765/api/accessories";
     } else {
         if(Object.keys(filteredItem).length !== 0 && filteredDataParameter === undefined){
            url = `http://localhost:8765/api/accessories/sort`;
            method = 'POST';
         } else {
            url = `http://localhost:8765/api/accessories/sort/name?&parameter=${filteredDataParameter}`;
         }
     } 

    const fetchAccessories = async() => {
         try{
             setIsLoading(true);
             const response = await axios({
                 method:method,
                 url,
                 headers:{
                     'Content-Type':'application/json'
                 },
                 data: filteredItem
             });
             const data = response.data.flat();
             setAccessoriesData(data);
             setIsLoading(false);
         } catch(error){
        }
    }

    useEffect(() => {
        fetchAccessories();
    },[url,filteredItem])
    
    return (
        !isLoading && <AccessoriesList accessoriesData={accessoriesData}/>
    )}

export default Accessories;