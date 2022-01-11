import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WorkshopList from "../components/workshop/WorkshopList";

const Workshop = () => {
    const [workshopData, setWorkshopData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const filteredDataFlag = useSelector(state => state.fetchWorkshopListFlag.flag);
    const filteredDataParameter = useSelector(state => state.fetchWorkshopListFlag.value);
    const filteredItem = useSelector(state => state.fetchWorkshopListFlag.item);

    let url = null;
    let method = 'GET';

    if(filteredDataFlag === true){
        url = "http://localhost:8765/api/workshop";
        } else {
        if(Object.keys(filteredItem).length !== 0 && filteredDataParameter === undefined){
            url = `http://localhost:8765/api/workshop/sort`;
            method = 'POST';
        } else {
            url = `http://localhost:8765/api/workshop/sort/name?&parameter=${filteredDataParameter}`;
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
          const data = response.data.flat();
          setWorkshopData(data);
          setIsLoading(false);
      } catch(error){
       }
    }

    useEffect(() => {
        fetchApi();
      },[url,filteredItem]);

    return (
       !isLoading && <WorkshopList workshopData={workshopData}/>
    );
};

export default Workshop;