import { useLocation, useParams } from "react-router";
import * as React from 'react';
import {Fragment} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { Card, TextField } from "@material-ui/core";
import { Button } from 'react-bootstrap';
import SelectInput from './../components/commons/SelectInput'
import apiSpec from '../api/apiSpec';
import axios from "axios";
import { useCallback, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ModifyBike = () => {
    const location = useLocation();
    const type = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
    const [brakeName, setBrakeName] = useState([]);
    const [driveName, setDriveName] = useState([]);
    const [frameName, setFrameName] = useState([]);
    const jwt = useSelector((state) => state.userLogin.jwt);

    const [itemToModify, setItemToModify] = useState({});
    //refs
    const markRef = useRef(null);
    const bikeTypeRef = useRef(null);
    const colorRef = useRef(null);
    const genderRef = useRef(null);
    const brakeRef = useRef(null);
    const driveRef = useRef(null);
    const frameRef = useRef(null);
    //errors
    const [selectError, setSelectError] = useState('');


    let {name} = useParams();
  
const AddItemSchema = Yup.object().shape({
    name: Yup.string()
    .required('Pole nazwa jest wymagane'),
    description: Yup.string()
    .required('Opis nie może być pusty'),
    price: Yup.string()
    .required('Podaj cenę'),
    quantity: Yup.string()
    .required('Podaj ilość towaru'),
    bikeCode: Yup.string()
    .required('Podaj kod roweru')
})

const addBikeApi = async function (bikeToSave) {
    try {
      const response = await axios({
        method: apiSpec.MODIFY_BIKES.operation,
        url: apiSpec.MODIFY_BIKES.url,
        headers: {
          // "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
        data: {
            ...bikeToSave
        }
      });
      const data = response.data;
      console.log("Dobre dane zmieniam stronę");
    } catch (error) {
      console.log(error);
    }
  };

    const fetchBike = useCallback(async() => {
        const response = await axios({
            url:apiSpec.BIKE_DETAILS_BY_NAME.url +`/${name}`,
            method:apiSpec.BIKE_DETAILS_BY_NAME.operation
        });
        const data = response.data;
        setItemToModify(data);

    })

    const fetchBrakes = useCallback(async() => {
        const response = await axios({
            url: apiSpec.BIKE_PARTS_NAMES.url,
            method: apiSpec.BIKE_PARTS_NAMES.operation
        })
        const data = response.data;
        setBrakeName(data.brakeNames);
        setDriveName(data.driveNames);
        setFrameName(data.frameNames);
    })

    useEffect(() => {
        fetchBrakes();
        fetchBike();
    },[]);

    return (
        <Fragment>
            <div>
             <Card style={{height:'30%', width:'100%', marginTop:'4%', marginLeft:'0%', borderRadius:'25px', padding:'1%'}}>
                <h1>Dane:</h1>
                <label>Nazwa</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.name}/>
                <label>Opis</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.description}/>
                <label>Cena</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.price}/>
                <label>Ilość</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.quantity}/>
                <label>Kod roweru</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.bikeCode}/>
                <label>Marka</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.mark}/>
                <label>Typ roweru</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.bikeType}/>
                <label>Kolor</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.color}/>
                <label>Płeć</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.genderType === 'MALE' ? 'Męski' : 'Żeński'}/>
                <label>Hamulec</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.brake?.name}/>
                <label>Napęd</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.drive?.name}/>
                <label>Rama</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.frame?.name}/>

            </Card>
            </div>
        <div style={{width:'100%'}}>
          <Formik
            initialValues={{
            }}
            validateOnChange={false}
            validateOnBlur={false}
            // validationSchema={AddItemSchema}
            onSubmit = {(values ,{validate, errors}) => {
                setSelectError('');
             
       
                const bikeToSave = {
                    ...values,
                    mark: markRef.current.innerText,
                    bikeType: bikeTypeRef.current.innerText,
                    color: colorRef.current.innerText,
                    gender: genderRef.current.innerText,
                    brake: brakeRef.current.innerText,
                    drive: driveRef.current.innerText,
                    frame: frameRef.current.innerText,
                    itemType: 'BIKES',
                    id: itemToModify.id
                }
                console.log(bikeToSave);
                addBikeApi(bikeToSave);
            }}
        >
            {({errors}) => (
    
                <Card style={{height:'30%', width:'100%', marginTop:'4%', marginLeft:'0%', borderRadius:'25px', padding:'1%'}}>
                <h1>Modyfikuj rower</h1>
                <Form>
                    <div className="form-group">
                    <label>Nazwa</label>
                    {errors.name ?
                    <Field name="name" className="form-control" placeholder={errors.name} style={{borderColor:'red'}}/>
                       :
                    <Field name="name" className="form-control" />}
                    <label>Opis</label>
                            {errors.description ?
                     <Field name="description" className="form-control" placeholder={errors.description} style={{borderColor:'red'}}/>
                    :
                     <Field name="description" className="form-control"/>}
                    </div>
                     <label>Cena</label>
                    {errors.price ?
                    <Field name="price" className="form-control" placeholder={errors.price} style={{borderColor:'red'}}/>
                       :
                    <Field name="price" className="form-control"/>}
                     <label>Ilość</label>
                    {errors.quantity ?
                    <Field name="quantity" className="form-control" placeholder={errors.quantity} style={{borderColor:'red'}}/>
                       :
                    <Field name="quantity" className="form-control"/>}
                      <label>Kod roweru</label>
                    {errors.bikeCode ?
                    <Field name="bikeCode" className="form-control" placeholder={errors.bikeCode} style={{borderColor:'red'}}/>
                       :
                    <Field name="bikeCode" className="form-control" placeholder="Kod roweru"/>}
                    <SelectInput description="Marka" items={["Kands", "Merida", "Cannondale", "Trek", "Kross"]} ref={markRef}/>
                    <SelectInput description="Typ roweru" items={["BMX", "Crossowe", "Elektryczne", "Górskie MTB", "Gravele i przełajowe","Miejskie", "Trekkingowe"]} ref={bikeTypeRef}/>
                    <SelectInput description="Kolor" items={["Czarny", "Biały", "Czerwony", "Zielony", "Srebrny", "Pomarańczowy"]} ref={colorRef}/><br/>
                    <SelectInput description="Płeć" items={["Kobieta", "Mężczyzna"]} name="gender" ref={genderRef}/>
                    <SelectInput description="Hamulec" items={brakeName} ref={brakeRef}/>
                    <SelectInput description="Napęd" items={driveName} ref={driveRef}/>
                    <SelectInput description="Rama" items={frameName} ref={frameRef}/>
                    {!!selectError && <p class = "alert alert-danger">{selectError}</p>}
                    <br/>
                    <Button type="submit" style={{marginRight:'16%'}}>Dodaj rower</Button>
                </Form>
                </Card>
            )}
        </Formik>
    </div>
    </Fragment>
    )
}
export default ModifyBike;