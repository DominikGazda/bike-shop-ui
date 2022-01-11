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


const ModifyAccessories = () => {
    const location = useLocation();
    const type = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
    const [accessoriesType, setAccessoriesType] = useState('');
    //refs
    const markRef = useRef(null);
    const colorRef = useRef(null);
    const pumpTypeRef = useRef(null);
    const pumpValveRef = useRef(null);
    //errors
    const [selectError, setSelectError] = useState('');
    const [itemToModify, setItemToModify] = useState({});
    let {name} = useParams();
    const jwt = useSelector((state) => state.userLogin.jwt);

  
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

const addAccessoriesApi = async function (accessoriesToSave) {
    try {
      const response = await axios({
        method: apiSpec.MODIFY_ACCESSORIES.operation,
        url: apiSpec.MODIFY_ACCESSORIES.url,
        headers: {
          // "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
        data: {
            ...accessoriesToSave
        }
      });
      const data = response.data;
    } catch (error) {
      console.log(error);
    }
  };

    const handleAccesoriesTypeChange = (e) => {
        setAccessoriesType(e.target.value)
    }

    const fetchAccessories = useCallback(async() => {
        const response = await axios({
            url:apiSpec.BIKE_DETAILS_BY_NAME.url.replace('bikes','accessories') +`/${name}`,
            method:apiSpec.BIKE_DETAILS_BY_NAME.operation
        });
        const data = response.data;
        setItemToModify(data);
    })

    console.log(itemToModify);
    useEffect(() => {
        fetchAccessories();
    },[])

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
                {itemToModify.accessoriesType === 'BOTTLE' &&
                <div>
                   <label>Materiał</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.material}/>
                <label>Pojemność</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.capacity}/>
                <label>Bidon/kubek termiczny</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.thermal === false ? 'Nie' : 'Tak'}/>
                </div>}
                {itemToModify.accessoriesType === 'FENDERS' &&
                <div>
                <label>Dodatkowe przedmioty</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.additionalItems}/>
                <label>Materiał</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.material}/>
                <label>Montaż</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.montage}/>
                <label>Rozmiar koła</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.wheelSize}/>
                <label>Rozmiar Błotnika</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.fenderSize}/>
                <label>Możliwość szybkiego montażu</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.fastMontage === false ? 'Nie' : 'Tak'}/>
                </div>}
                {itemToModify.accessoriesType === 'PUMP' &&
                <div>
                <label>Maksymalne ciśnienie</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.maxPressure}/>
                <label>Opcja z manometrem</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.manometer === false ? 'Nie' : 'Tak'}/>
                <label>Opcja z nabojem</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.catridge === false ? 'Nie' : 'Tak'}/>
                <label>Rodzaj pompki</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.pumpType}/>
                <label>Przeznaczenie</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.valveType}/>
                </div>}
                {itemToModify.accessoriesType === 'BAGS' &&
                <div>
                <label>Pojemność</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.capacity}/>
                <label>Montaż</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.installation}/>
                <label>Możliwość szybkiego montażu</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.fastMontage ? 'Nie' : 'Tak'}/>
                <label>Wodoodporność</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.waterproof === false ? 'Nie' : 'Tak'}/>
                <label>Rozmiar</label>
                <input type="text" name="name" className="form-control" disabled={true} placeholder={itemToModify.dimensions}/>
                </div>}

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
                
                
                const accessoriesToSave = {
                    ...values,
                    mark: markRef.current.innerText,
                    accessoriesType,
                    color: colorRef.current.innerText,
                    itemType: 'ACCESSORIES',
                    accessoriesType: itemToModify.accessoriesType,
                    id:itemToModify.id
                }
                addAccessoriesApi(accessoriesToSave);
            }}
        >
            {({errors}) => (
    
                <Card style={{height:'30%', width:'100%', marginTop:'4%', marginLeft:'0%', borderRadius:'25px', padding:'1%'}}>
                {itemToModify.accessoriesType === 'PUMP' && <h1>Modyfikuj pompkę</h1>}
                {itemToModify.accessoriesType === 'BAGS' && <h1>Modyfikuj torbę</h1>}
                {itemToModify.accessoriesType === 'BOTTLE' && <h1>Modyfikuj bidon/butelkę</h1>}
                {itemToModify.accessoriesType === 'FENDERS' && <h1>Modyfikuj błotnik</h1>}
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
                    {itemToModify.accessoriesType === 'BAGS' && <div>
                    <label>Pojemność</label>
                    <Field name="capacity" className="form-control" />
                    <label>Montaż</label>
                    <Field name="installation" className="form-control"/>
                    <label>Mozliwość szybkiego montażu</label>
                    <Field type="checkbox" name="fastMontage" /><br/>
                    <label>Wodoodporność</label>
                    <Field type="checkbox" name="waterproof"/> <br/>
                    <label>Rozmiar</label>
                    <Field name="dimension" className="form-control"/>
                    </div>}
                    {itemToModify.accessoriesType === 'BOTTLE' && <div>
                    <label>Materiał</label>
                    <Field name="material" className="form-control" />
                    <label>Pojemność</label>
                    <Field name="capacity" className="form-control" />
                    <label>Bidon/kubek termiczny</label>
                    <Field type="checkbox" name="thermal"/> <br/>
                    </div>}
                    {itemToModify.accessoriesType === 'PUMP' && <div>
                    <label>Maksymalne ciśnienie</label>
                    <Field name="maxPressure" className="form-control" />
                    <label>Opcja z manometrem</label>
                    <Field type="checkbox" name="manometer"/> <br/>
                    <label>Opcja z nabojem</label>
                    <Field type="checkbox" name="isCatrige"/> <br/>
                    <SelectInput description="Rodzaj pompki" items={["Pompka ręczna", "Pompka automatyczna"]} ref={pumpTypeRef} />
                    <SelectInput description="Przeznaczenie" items={["Pompka rowerowa", "Pompka samochodowa"]} ref={pumpValveRef} />
                    </div>}
                    {itemToModify.accessoriesType === 'FENDERS' && <div>
                    <label>Dodatkowe przedmioty</label>
                    <Field name="additionalItems" className="form-control" />
                    <label>Materiał</label>
                    <Field name="material" className="form-control" />
                    <label>Montaż</label>
                    <Field name="montage" className="form-control" />
                    <label>Rozmiar koła</label>
                    <Field name="wheelSize" className="form-control" />
                     <label>Rozmiar błotnika</label>
                    <Field name="fenderSize" className="form-control" />
                    <label>Możliwość szybkiego montażu</label>
                    <Field type="checkbox" name="fastMontage"/> <br/>
                    </div>}
                    {itemToModify.accessoriesType === "PUMP" || itemToModify.accessoriesType === "FENDERS" ? (
                <SelectInput
                  description="Marka"
                  items={["eyen", "sks", "kross"]}
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
                    <Button type="submit" style={{marginRight:'16%'}}>Dodaj akcesoria</Button>
                </Form>
                </Card>
            )}
        </Formik>
    </div>
    </Fragment>
    )
}
export default ModifyAccessories;