import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form} from 'formik';
import { Fragment, useMemo, useState, useCallback } from "react";
import ShipmentDetails from "./ShipmentDetails";
import { useDispatch, useSelector } from "react-redux";
import PaymentMethod from "./PaymentMethod";
import OrderAgreements from "./OrderAgreements";
import OrderClientSummaryCart from "./OrderClientSummaryCart";
import { useHistory, useLocation } from "react-router";
import AddOrder from "../../store/actions";
import axios from "axios";
import apiSpec from '../../api/apiSpec';

const OrderClientForm = (props) => {
  const location = useLocation();
  const jwt = useSelector(state => state.userLogin.jwt);
  const deliveryPrice = useSelector(state => state.items.delivery.price);
  const deliveryName = useSelector(state => state.items.delivery.name);
  const orderedItems = useSelector(state => state.items.items);
  const [user, setUser] = React.useState({});
  const [accountAddress, setAccountAddress] = React.useState(false);

  const dispatch = useDispatch();

  const [statute, setStatute] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  const memoizedUrl = useMemo(() => {
    return location.pathname.slice(1);
  },[]);

  const history = useHistory();

  const addOrderApi = async function  (user) {
    try{
      //Dane uzytkownika
      //Zamowienie
        const bikes = orderedItems.filter(item => item.itemType === 'BIKES');
        const accessories = orderedItems.filter(item => item.itemType ==='ACCESSORIES');
        const workshop = orderedItems.filter(item => item.itemType === 'WORKSHOP');
        const parts = orderedItems.filter(item => item.itemType === 'PARTS');
        const bags = accessories.filter(item => item.accessoriesType === 'BAGS');
        const bottles = accessories.filter(item => item.accessoriesType === 'BOTTLE');
        const fenders = accessories.filter(item => item.accessoriesType === 'FENDERS');
        const pumps = accessories.filter(item => item.accessoriesType === 'PUMP');
        const brakes = parts.filter(item => item.bikePartsType === 'BRAKE');
        const drives = parts.filter(item => item.bikePartsType === 'DRIVE');
        const frames = parts.filter(item => item.bikePartsType === 'FRAME');
        const maintenances = workshop.filter(item => item.workshopType === 'MAINTENANCE');
        const racks = workshop.filter(item => item.workshopType === 'RACKS');
        const tools = workshop.filter(item => item.workshopType === 'TOOLS');

        // console.log(bikes);
        const response = await axios({
            method:'POST',
            url:"http://localhost:8765/api/orders",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${jwt}`
            },
            data:{
              "status": "NEW",
              "orderDate": Date.now(),
              saveOrderedItemsRequest:{
                bikes,
                bags,
                bottles,
                fenders,
                pumps,
                brakes,
                drives,
                frames,
                maintenances,
                racks,
                tools
              },
              address:{
                ...user
              }
            }
        });
        const data = response.data;
        console.log("Dobre dane zmieniam stronę");
        history.push(`/${memoizedUrl}/summary`)
    } catch(error){
        console.log(error);
    }
  }

  const handleAccountAddressChange = (setFieldValue) => {
      setFieldValue('name','name11');
      setAccountAddress(!accountAddress);
  }

  const handleStatuteChange = (event) => {
    setStatute(event.target.checked);
  };

  const handleNewsletterChange = (event) => {
      setNewsletter(event.target.checked);
  }

  const username = useSelector(state => state.userLogin.login);

  const fetchApi = useCallback(async() => {
    const response = await axios.get(apiSpec.USER_DETAILS.url, {params:{username}})
    const data = response.data;
    setUser(data);
});

console.log(user);
useState(() => {
  fetchApi();
},[]);

    return (
        
            <Col md={8}>
   <div>
     <h1>Dane zamawiającego</h1>
     <Formik
       initialValues={{ 
         name:user.name,
         surname:user.surname,
         street:user.street,
         houseNumber:user.houseNumber,
         localNumber:user.localNumber,
         postalCode:user.postalCode,
         zipCode:user.zipCode,
         city:user.city,
         phone:user.phone,
         email: user.email, 
         phone:user.phone, 
         statute:user.statute}}
       validate={values => {
         let errors = {};
         if (!values.email) {
           errors.email = 'Adres e-mail nie może być pusty';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Nieprawidłowy adres e-mail';
         }
        if(!values.name){
          errors.name = "Imię nie może być puste";
        }
        if(!values.surname){
          errors.surname = "Nazwisko nie może być puste";
        }
        if(!values.zipCode || !values.city){
          errors.postalCode = "Proszę podać pełny kod pocztowy";
        }
        if(!values.phone){
          errors.phone = "Numer telefonu nie może być pusty";
        }
        if(!values.street && !values.houseNumber){
          errors.address = "Adres nie może być pusty";
        } else if(!values.street){
          errors.address="Pole ulica nie może być puste";
        } else if(!values.houseNumber){
          errors.address="Pole numer domu nie może być puste";
        }
        if(statute === false){
          errors.statute = "Zamówienie dostępne po zaakceptowaniu regulaminu";
        }
        if(!accountAddress){
          errors = {};
        }

         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {

        if(!accountAddress){
          values = null
          // values = {
          //   name:user.name,
          //   surname:user.surname,
          //   street:user.street,
          //   houseNumber:user.houseNumber,
          //   localNumber:user.localNumber,
          //   postalCode:user.postalCode,
          //   zipCode:user.zipCode,
          //   city:user.city,
          //   phone:user.phone,
          //   email: user.email, 
          //   phone:user.phone, 
          //   statute:user.statute
          }
        //  setTimeout(() => {
        //    alert(JSON.stringify(values, null, 2));
        setSubmitting(false);   
        //  }, 400);
        // setSubmitting(true);   
        // console.log(values);
        addOrderApi(values);
       }}
     >
       {({ isSubmitting, setFieldValue}) => (
         <Form>
           {!accountAddress ? <div>
           <Field type="name" name="name" placeholder={user.name} className="form-control" disabled={true}/>
           <Field type="surname" name="surname" placeholder={user.surname} className="form-control" disabled={true}/>
           <Field type="address" name="street" placeholder={user.address?.street} disabled={true}/>
           <Field type="address" name="houseNumber" placeholder={user.address?.houseNumber} style={{width:'15%'}} disabled={true}/>
           <Field type="address" name="localNumber" placeholder={user.address?.localNumber} style={{width:'15%'}} disabled={true} /><br/>
           <Field type="postalCode" name="zipCode" placeholder={user.address?.postalCode} disabled={true} />
           <Field type="postalCode" name="city" placeholder={user.address?.city} disabled={true}/>
           <Field type="phone" name="phone" placeholder={user.address?.phone} className="form-control" disabled={true}/>
           <Field type="email" name="email" placeholder={user.address?.email} className="form-control" disabled={true}/>
           </div> :
           <div>
           <Field type="name" name="name" placeholder="Imię" className="form-control"/>
           <ErrorMessage name="name" component="div"  className="alert alert-danger"/>
           <Field type="surname" name="surname" placeholder="Nazwisko" className="form-control"/>
           <ErrorMessage name="surname" component="div"  className="alert alert-danger"/>
           <Field type="address" name="street" placeholder="Ulica"/>
           <Field type="address" name="houseNumber" placeholder="Nr domu" style={{width:'15%'}}/>
           <Field type="address" name="localNumber" placeholder="Nr lokalu" style={{width:'15%'}} /><br/>
           <ErrorMessage name="address" component="div" className="alert alert-danger"/>
           <Field type="postalCode" name="zipCode" placeholder="Kod pocztowy" />
           <Field type="postalCode" name="city" placeholder="Miasto"/>
           <ErrorMessage name="postalCode" component="div" className="alert alert-danger"/>
           <Field type="phone" name="phone" placeholder="Numer telefonu" className="form-control"/>
           <ErrorMessage name="phone" component="div" className="alert alert-danger"/>
           <Field type="email" name="email" placeholder="Adres e-mail" className="form-control"/>
           <ErrorMessage name="email" component="div" className="alert alert-danger"/>
           </div>
           }
           <br/>
           <Button onClick={() => {
                   setAccountAddress(!accountAddress);
                   if(accountAddress === true){
                     setFieldValue('name', user.name);
                     setFieldValue('surname',user.surname);
                     setFieldValue('street', user.address?.street);
                     setFieldValue('houseNumber', user.address?.houseNumber);
                     setFieldValue('localNumber', user.address?.localNumber);
                     setFieldValue('zipCode', user.address?.zipCode);
                     setFieldValue('city', user.address?.city);
                     setFieldValue('phone', user.address?.phone);
                     setFieldValue('email', user.address?.email);
                   } else {
                    setFieldValue('name','');
                    setFieldValue('surname','');
                    setFieldValue('street','');
                    setFieldValue('houseNumber','');
                    setFieldValue('localNumber','');
                    setFieldValue('zipCode','');
                    setFieldValue('city','');
                    setFieldValue('phone','');
                    setFieldValue('email','');
                   }
           }} class="btn btn-primary">Chcę wprowadzić inny adres dostawy</Button>
           <hr/>
           <Row>
             <ShipmentDetails deliveryPrice={deliveryPrice} deliveryName={deliveryName}/>
           </Row>
           <hr/>
           <Row>
             <PaymentMethod />
           </Row>
           <hr/>
           <Row>
             <OrderAgreements 
              handleStatuteChange={handleStatuteChange} 
              handleNewsletterChange={handleNewsletterChange}
              statute = {statute}
              newsletter = {newsletter}/>
              <ErrorMessage name="statute" component="div" className="alert alert-danger"/>
           </Row>
           <hr/>
           <Row>
             <OrderClientSummaryCart deliveryPrice={deliveryPrice} />
           </Row>
           
           <button type="submit" disabled={isSubmitting} className="btn btn-primary">
             Zamawiam
           </button>
         </Form>
       )}
     </Formik>
   </div>
            </Col>

        
    );
}

export default OrderClientForm;