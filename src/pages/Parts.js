import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PartsList from '../components/parts/PartsList';

const Parts = () => {
  const [partsData, setPartsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const filteredDataFlag = useSelector(state => state.fetchPartsDataListFlag.flag);
  const filteredDataParameter = useSelector(state => state.fetchPartsDataListFlag.value);
  const filteredItem = useSelector(state => state.fetchPartsDataListFlag.item)
 

  let url = null;
  let method = 'GET';

  console.log(filteredItem);
  console.log(filteredDataParameter);

  if(filteredDataFlag === true){
    url = "http://localhost:8765/api/bike/parts";
    } else {
    if(Object.keys(filteredItem).length !== 0 && filteredDataParameter === undefined){
        url = `http://localhost:8765/api/bike/parts/sort`;
        method = 'POST';
    } else {
        url = `http://localhost:8765/api/bike/parts/sort/name?&parameter=${filteredDataParameter}`;
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
      setPartsData(data);
      setIsLoading(false);
  } catch(error){
   }
}
console.log(partsData);
useEffect(() => {
    fetchApi();
  },[url,filteredItem]);

    return (
       !isLoading && <PartsList partsData={partsData}/>
    );
};

export default Parts;