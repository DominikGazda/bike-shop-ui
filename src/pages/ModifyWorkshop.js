import { useLocation, useParams } from "react-router";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Fragment} from 'react'
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { Card, TextField } from "@material-ui/core";
import { Button } from 'react-bootstrap';
import SelectInput from './../components/commons/SelectInput'
import apiSpec from '../api/apiSpec';
import axios from "axios";
import { useCallback, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";


const ModifyWorkshop = () => {
    const location = useLocation();
    const type = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
    const [workshopType, setWorkshopType] = useState('');
    //refs
    const markRef = useRef(null);
    const bikeTypeRef = useRef(null);
    const colorRef = useRef(null);
    const pumpTypeRef = useRef(null);
    const pumpValveRef = useRef(null);
    const jwt = useSelector((state) => state.userLogin.jwt);

    //errors
    const [selectError, setSelectError] = useState('');
    const [itemToModify, setItemToModify] = useState({});
    let {name} = useParams();


    const fetchWorkshop = useCallback(async() => {
        const response = await axios({
            url:apiSpec.BIKE_DETAILS_BY_NAME.url.replace('bikes','workshop') +`/${name}`,
            method:apiSpec.BIKE_DETAILS_BY_NAME.operation
        });
        const data = response.data;
        setItemToModify(data);
    })

    const addWorkshopApi = async function (workshopToSave) {
        try {
          const response = await axios({
            method: apiSpec.MODIFY_WORKSHOP.operation,
            url: apiSpec.MODIFY_WORKSHOP.url,
            headers: {
              // "Content-Type": 'multipart/form-data',
              Authorization: `Bearer ${jwt}`,
            },
            data: {
                ...workshopToSave
            }
          });
          const data = response.data;
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        fetchWorkshop();
    },[])
  
const AddItemSchema = Yup.object().shape({
    name: Yup.string()
    .required('Pole nazwa jest wymagane'),
    description: Yup.string()
    .required('Opis nie może być pusty'),
    price: Yup.string()
    .required('Podaj cenę'),
    quantity: Yup.string()
    .required('Podaj ilość towaru'),
    productCode: Yup.string()
    .required('Podaj kod roweru')
})

    const handleWorkshopTypeChange = (e) => {
        setWorkshopType(e.target.value)
    }
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
           <label>Kod produktu</label>
           <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.productCode}/>
           <label>Marka</label>
           <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.mark}/>
           <label>Waga</label>
           <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.weight}/>
           <label>Kolor</label>
           <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.color}/>
           <label>Pojemność</label>
           <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.capacity}/>
           <label>Użycia</label>
           <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.usages}/>
       </Card>
       </div>
        <div style={{width:'100%'}}>
          <Formik
            initialValues={{
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={AddItemSchema}
            onSubmit = {(values ,{validate, errors}) => {
                setSelectError('');
             
                if(markRef.current.innerText.length == 1){
                    setSelectError('Wybierz markę');
                    return;
                }
                 if(colorRef.current.innerText.length == 1){
                    setSelectError('Wybierz kolor');
                    return;
                }
                
                const workshopToSave = {
                    ...values,
                    mark: markRef.current.innerText,
                    workshopType,
                    color: colorRef.current.innerText,
                    itemType: 'WORKSHOP',
                    workshopType: itemToModify.workshopType,
                    id:itemToModify.id
                }
                
                addWorkshopApi(workshopToSave);
            }}
        >
            {({errors}) => (
    
                <Card style={{height:'30%', width:'100%', marginTop:'4%', marginLeft:'0%', borderRadius:'25px', padding:'1%'}}>
                {itemToModify.workshopType === 'MAINTENANCE' && <h1>Modyfikuj towar do konserwacji</h1>}
                {itemToModify.workshopType === 'TOOLS' && <h1>Modyfikuj narzędzia</h1>}
                {itemToModify.workshopType === 'RACKS' && <h1>Modyfikuj stojak na rower</h1>}
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
                      <label>Kod produktu</label>
                    {errors.productCode ?
                    <Field name="productCode" className="form-control" placeholder={errors.productCode} style={{borderColor:'red'}}/>
                       :
                    <Field name="productCode" className="form-control"/>}
                     <label>Waga</label>
                    {errors.weight ?
                    <Field name="weight" className="form-control" placeholder={errors.weight} style={{borderColor:'red'}}/>
                       :
                    <Field name="weight" className="form-control"/>}
                      <label>Pojemność</label>
                    {errors.capacity ?
                    <Field name="capacity" className="form-control" placeholder={errors.capacity} style={{borderColor:'red'}}/>
                       :
                    <Field name="capacity" className="form-control"/>}
                      <label>Użycia</label>
                     {errors.usages ?
                    <Field name="usages" className="form-control" placeholder={errors.usages} style={{borderColor:'red'}}/>
                       :
                    <Field name="usages" className="form-control"/>}

                    <SelectInput description="Marka" items={["Kands", "Merida", "Cannondale", "Trek", "Kross"]} ref={markRef} />
                    <SelectInput description="Kolor" items={["Czarny", "Biały", "Czerwony", "Zielony", "Srebrny", "Pomarańczowy"]} ref={colorRef}/><br/>
                    {!!selectError && <p class = "alert alert-danger">{selectError}</p>}
                    <br/>    
                    <Button type="submit" style={{marginRight:'16%'}}>Dodaj akcesoria</Button>
                </Form>
                </Card>
            )}
        </Formik>
    </div>
    </Fragment>
    )
}
export default ModifyWorkshop;