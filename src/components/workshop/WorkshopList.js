import axios from "axios";
import { useCallback, useState } from "react";
import { CardColumns, Card, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../commons/ItemCard";

const WorkshopList = () => {
  // const dispatch = useDispatch();
  // dispatch({type:'FETCH_WORKSHOP'});
  // const workshopData = useSelector(state => state.fetchItems);

  const [workshopData, setWorkshopData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  const fetchApi = useCallback(async() =>{
    try{
      setIsLoading(true);
      const response = await axios({
          method:'GET',
          url:"http://localhost:8765/api/workshop",
          headers:{
              'Content-Type': 'application/json',
          }
      });
      const data = response.data;
      setWorkshopData(data.flat());
      setIsLoading(false);
  } catch(error){
   }
  },[])

  useState(() => {
    fetchApi();
  },[fetchApi])

    return (
        <Row>
          { !isLoading && workshopData.map((data) => (
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

export default WorkshopList;