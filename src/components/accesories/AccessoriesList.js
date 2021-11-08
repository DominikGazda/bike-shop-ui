import axios from "axios";
import { useCallback, useState } from "react";
import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../commons/ItemCard";


const AccessoriesList = () => {
  // const dispatch = useDispatch();
  // dispatch({type:'FETCH_ACCESSORIES'});
  // const accessoriesData = useSelector(state => state.fetchItems);
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 

  const fetchApi = useCallback(async() =>{
    try{
      setIsLoading(true);
      const response = await axios({
          method:'GET',
          url:"http://localhost:8765/api/accessories",
          headers:{
              'Content-Type': 'application/json',
          }
      });
      const data = response.data;
      setAccessoriesData(data.flat());
      setIsLoading(false);
  } catch(error){
   }
  },[])

  useState(() => {
    fetchApi();
  },[fetchApi])

  return (
    <Row>
      { !isLoading && accessoriesData.map((data) => (
          <ItemCard
          id = {data.id}
          name = {data.name}
          price = {data.price}
          image = {data.images[0]}
          type = {data.itemType}
        />
      ))
      }
   </Row>
  )
}

export default AccessoriesList;