import { Fragment } from "react";

const ShipmentDetails = (props) =>{

    const {deliveryPrice, deliveryName} = {...props};



    return(
        <div style={{backgroundColor:"white"}}>
             <h1>Sposób i adres dostawy</h1>
            <h5> Przesyłka kurierska ({deliveryName.toUpperCase()})</h5>
            <h6>Cena : {deliveryPrice}</h6>
        </div>
    )
}
export default ShipmentDetails;