import axios from "axios";
import { useMemo,useState ,useEffect, useCallback } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import DetailsHeader from "../components/layout/DetailsHeader";
import DetailsNavigation from "../components/layout/DetailsNavigation";
import DeliveryDescription from "./DeliveryDescription";
import DetailsDescription from "./DetailsDescription";
import SpecsDescription from "./SpecsDescription";

const ItemDetails = (props) => {
    const location = useLocation();    
    // // const items = useSelector(state => state.fetchItems);
    const memoizedUrl = useMemo(() => {
        return location.pathname.slice(1);
    },[]);

    // const itemNameFromPath = memoizedUrl.replaceAll("-"," ").toLowerCase();
    // // const itemType = location.
    // // const currentItem = items.filter(item => (
    // //     item.name.toLowerCase().replaceAll(" ","-").includes(memoizedUrl.toLowerCase())
    // // ));
    let {type, name} = useParams();

    const [currentItem, setCurrentItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let itemURL = '';
    if(type === 'parts'){
        itemURL = `http://localhost:8765/api/bike/${type}/${name.replaceAll("-"," ")}`;
    } else {
        itemURL = `http://localhost:8765/api/${type}/${name.replaceAll("-"," ")}`;
    }
      const fetchApi = useCallback(async() => {
      try{
        setIsLoading(true);
        const response = await axios({
            method:'GET',
            url: itemURL,
            headers:{
                'Content-Type': 'application/json',
            }
        });
        const data = response.data;
        setCurrentItem(data);
        setIsLoading(false);
    } catch(error){
     }
    });

    useState(() => {
        fetchApi();
    },[]);

    return (
        <Fragment>
        {!isLoading && <DetailsHeader item = {currentItem}/>}
        <DetailsNavigation mainUrl={memoizedUrl}/>
        <Switch>
            <Route path={`/${memoizedUrl}/opis`} exact>
                <DetailsDescription />
            </Route>
            <Route path={`/${memoizedUrl}/specyfikacja`} exact>
                <SpecsDescription />
            </Route>
            <Route path={`/${memoizedUrl}/dostawa`} exact>
                <DeliveryDescription />
            </Route>
        </Switch>
        </Fragment>
    )

}

export default ItemDetails;