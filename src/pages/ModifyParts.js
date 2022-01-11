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

const ModifyParts = () => {
    const location = useLocation();
    const type = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
    const [partType, setPartType] = useState('');
    const jwt = useSelector((state) => state.userLogin.jwt);
    //refs
    const markRef = useRef(null);
    const bikeTypeRef = useRef(null);
    const colorRef = useRef(null);
    const genderRef = useRef(null);
    const brakeRef = useRef(null);
    const driveRef = useRef(null);
    const frameRef = useRef(null);
    const brakeTypeRef = useRef(null);
    //errors
    const [selectError, setSelectError] = useState('');
    const [itemToModify, setItemToModify] = useState({});
    let {name} = useParams();
    let itemName;

  
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

 
const fetchPart = useCallback(async() => {
    const response = await axios({
        url:apiSpec.BIKE_DETAILS_BY_NAME.url.replace('bikes','bike/parts') +`/${name}`,
        method:apiSpec.BIKE_DETAILS_BY_NAME.operation
    });
    const data = response.data;
    setItemToModify(data);
})

const addPartApi = async function (partToSave) {
    try {
      const response = await axios({
        method: apiSpec.MODIFY_BIKE_PART.operation,
        url: apiSpec.MODIFY_BIKE_PART.url,
        headers: {
          // "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
        data: {
            ...partToSave
        }
      });
      const data = response.data;
    } catch (error) {
      console.log(error);
    }
  };


    const handlePartTypeChange = (e) => {
        setPartType(e.target.value)
    }

    useEffect(() => {
        fetchPart();
    },[])

    console.log(itemToModify);

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
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.productCode}/>
                <label>Marka</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.mark}/>
                <label>Waga</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.weight}/>
                <label>Kolor</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.color}/>
                {itemToModify.bikePartsType === 'FRAME' &&
                <div>
                    Rama
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.frameSize}/>
                </div>}
                {itemToModify.bikePartsType === 'BRAKE' && 
                <div>
                    <label>Długość linki/przewodu</label>
                    <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.cableLength}/>
                    <label>Rodzaj hamulca</label>
                    <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.brakeType}/>

               </div>}
               {itemToModify.bikePartsType === 'DRIVE' && (
                  <div>
                  <label>Dedykowana do kasety</label>
                  <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.cassette}/>
                  <label>Ilość rzędów</label>
                  <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.rowsCount} />
                  <label>Stopniowanie</label>
                  <input type="text"
                    name="name"
                    className="form-control"
                    placeholder=""
                    disabled={true} placeholder={itemToModify.gradation}
                  />
                </div>
              )}

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
                
                const partToSave = {
                    ...values,
                    mark: markRef.current.innerText,
                    partType: partType,
                    color: colorRef.current.innerText,
                    brakeType: brakeTypeRef.current?.innerText,
                    itemType: 'PARTS',
                    id: itemToModify.id,
                    bikePartsType: itemToModify.bikePartsType
                }

                // console.log(partToSave);
                addPartApi(partToSave);
            }}
        >
            {({errors}) => (
    
                <Card style={{height:'30%', width:'100%', marginTop:'4%', marginLeft:'0%', borderRadius:'25px', padding:'1%'}}>
                {itemToModify.bikePartsType === "BRAKE" && <h1>Modyfikuj hamulec</h1>}
                {itemToModify.bikePartsType === "FRAME" && <h1>Modyfikuj ramę</h1>}
                {itemToModify.bikePartsType === "DRIVE" && <h1>Modyfikuj napęd</h1>}
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
                    <Field name="productCode" className="form-control" placeholder="Kod produktu"/>}
                     <label>Waga</label>
                    {errors.weight ?
                    <Field name="weight" className="form-control" placeholder={errors.weight} style={{borderColor:'red'}}/>
                       :
                    <Field name="weight" className="form-control" placeholder="Waga produktu"/>}
                    {itemToModify.bikePartsType === 'FRAME' && <div>
                    Rama
                    {errors.frameSize ?
                    <Field name="frameSize"  className="form-control" placeholder={errors.frameSize} style={{borderColor:'red'}}/>
                       :
                    <Field name="frameSize" className="form-control" placeholder="Rozmiar ramy"/>}
                    </div>}
                    {itemToModify.bikePartsType === 'BRAKE' && 
                    <div>
                    <label>Długość linki/przewodu</label>
                    <Field name="cableLength" className="form-control"/>
                    <SelectInput
                    description="Rodzaj hamulców"
                    items={[
                      "Hamulce mechaniczne",
                      "Hamulce hydrauliczne",
                      "Hamulce typu V-BRAKE",
                      "Hamulce rolkowe",
                      "Hamulce typu U-BRAKE",
                      "Hamulec torpedo",
                    ]}
                    ref={brakeTypeRef}
                  />
                    </div>}

                    {itemToModify.bikePartsType === 'BRAKE' && 
                    <div>
                    <label>Długość linki/przewodu</label>
                    <Field name="cableLength" className="form-control"/>
                    <SelectInput
                    description="Rodzaj hamulców"
                    items={[
                      "Hamulce mechaniczne",
                      "Hamulce hydrauliczne",
                      "Hamulce typu V-BRAKE",
                      "Hamulce rolkowe",
                      "Hamulce typu U-BRAKE",
                      "Hamulec torpedo",
                    ]}
                    ref={brakeTypeRef}
                  />
                    </div>}
                    {itemToModify.bikePartsType === 'DRIVE' && (
                  <div>
                  <label>Dedykowana do kasety</label>
                  <Field name="cassette" className="form-control" />
                  <label>Ilość rzędów</label>
                  <Field name="rowsCount" className="form-control" />
                  <label>Stopniowanie</label>
                  <Field
                    name="gradation"
                    className="form-control"
                    placeholder=""
                  />
                </div>
              )}
                    {itemToModify.bikePartsType === 'BRAKE' || itemToModify.bikePartsType === 'DRIVE'? (
                        <SelectInput
                        description="Marka"
                        items={["Shimano", "Sram"]}
                        ref={markRef}
                        />
                    ) : (
                        <SelectInput
                        description="Marka"
                        items={["Kands", "Merida", "Cannondale", "Trek", "Kross"]}
                        ref={markRef}
                        />
                    )}
                    <SelectInput description="Kolor" items={["Czarny", "Biały", "Czerwony", "Zielony", "Srebrny", "Pomarańczowy"]} ref={colorRef}/><br/>
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
export default ModifyParts;