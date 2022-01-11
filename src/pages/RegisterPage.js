import React, {Fragment} from 'react';
import { Card, TextField } from "@material-ui/core";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useHistory, useLocation } from 'react-router';
import apiSpec from '../api/apiSpec';
import { useMemo,useState ,useEffect, useCallback } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SinginSchema = Yup.object().shape({
    username: Yup.string()
    .required('Pole login jest wymagane')
    .min(2, ({min}) => `Pole musi zawierać ${min} znaki`),
    password: Yup.string()
    .required('Hasło nie może być puste'),
    name: Yup.string()
    .required('Imię nie może być puste'),
    surname: Yup.string()
    .required('Nazwisko nie może być puste'),
    street: Yup.string()
    .required('Ulica nie może być puste'),
    houseNumber: Yup.string()
    .required('Numer domu nie może być puste'),
    localNumber: Yup.string()
    .required('Numer lokalu nie może być puste'),
    city: Yup.string()
    .required('Miasto nie może być puste'),
    email: Yup.string()
    .required('Email nie może być puste'),
    phone: Yup.string()
    .required('Telefon nie może być puste'),
    postalCode: Yup.string()
    .required('Kod pocztowy nie może być puste'),
})

const RegisterPage = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    let adminLogin = false;
    const history = useHistory()

    if(location.pathname.includes('adm')){
        adminLogin = true;
    }

    const fetchApi = useCallback(async(values) => {
        
        const address = {
            name:values.name,
            surname:values.surname,
            street:values.street,
            houseNumber:values.houseNumber,
            localNumber:values.localNumber,
            zipCode:values.zipCode,
            city:values.city,
            phone:values.phone,
            email:values.email
        }

        try{
          setIsLoading(true);
          const response = await axios({
              method: apiSpec.REGISTER.operation,
              url: apiSpec.REGISTER.url,
              headers:{
                  'Content-Type': 'application/json',
              },
              data:{
                  ...values,
                  address
              }
          });
          const data = response.data;
          const userName = values.username;
          const password = values.password;
          console.log(data);
        //   dispatch({type:'LOGIN', userName, password, isLoggedIn:true, jwt:data});
          setIsLoading(false);
      } catch(error){
       }
      });

    return (
        <Fragment>
            {adminLogin ?<center><h1 style={{marginTop:'2.7%'}}>Rejestracja administratora</h1></center>:<center><h1 style={{marginTop:'2.7%'}}>Rejestracja użytkownika</h1></center>}
            
        <Formik
            initialValues={{
                username: '',
                password: '',
                name: '',
                surname: '',
                street:'',
                houseNumber:'',
                localNumber:'',
                city:'',
                email:'',
                phone:'',
                postalCode:'',
                statute:'',
                zipCode:''
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={SinginSchema}
            onSubmit = {(values ,{validate}) => {
                console.log('elo')
                console.log({values});
                fetchApi(values);
                history.push('/home');
                dispatch({type:"LOGOUT"});
            }}
        >
            {({errors}) => (
                <Card style={{height:'30%', width:'30%', marginTop:'4%', marginLeft:'35%', borderRadius:'25px', padding:'1%'}}>
                <Form>
                    <div className="form-group">
                    <label>Login</label>
                    {errors.username ?
                    <Field name="username" className="form-control" placeholder={errors.username} style={{borderColor:'red'}}/>
                       :
                    <Field name="username" className="form-control" placeholder="Login"/>}
                    <label>Hasło</label>
                    {errors.password ?
                       <Field type="password" name="password" className="form-control" placeholder={errors.password} style={{borderColor:'red'}}/>
                       :
                    <Field type="password" name="password" className="form-control" placeholder="Hasło"/>}
                    <label>Imię</label>
                    {errors.name ?
                    <Field name="name" className="form-control" placeholder={errors.name} style={{borderColor:'red'}}/>
                       :
                    <Field name="name" className="form-control" placeholder="Imię"/>}
                         <label>Nazwisko</label>
                    {errors.surname ?
                    <Field name="surname" className="form-control" placeholder={errors.surname} style={{borderColor:'red'}}/>
                       :
                    <Field name="surname" className="form-control" placeholder="Nazwisko"/>}
                         <label>Ulica</label>
                    {errors.street ?
                    <Field name="street" className="form-control" placeholder={errors.street} style={{borderColor:'red'}}/>
                       :
                    <Field name="street" className="form-control" placeholder="Ulica"/>}
                         <label>Numer domu | Numer lokalu</label>
                    <div style={{width:'100%'}}>
                        <div style={{width:'35%', float:'left', marginRight:'5%'}}>
                    {errors.houseNumber ?
                    <Field name="houseNumber" className="form-control" placeholder={errors.houseNumber} style={{borderColor:'red', float:'left', marginRight:'5%'}}/>
                       :
                    <Field name="houseNumber" className="form-control" placeholder="Nr domu"/>}
                        </div>
                        <div style={{width:'35%', float:'left'}}>
                    {errors.localNumber ?
                    <Field name="localNumber" className="form-control" placeholder={errors.localNumber} style={{borderColor:'red'}}/>
                       :
                    <Field name="localNumber" className="form-control" placeholder="Nr lokalu"/>}
                    </div>
                    </div>
                    <label>Kod pocztowy | Miasto</label>
                    <div style={{width:'100%'}}>
                    <div style={{width:'50%', float:'left', marginRight:'5%'}}>
                    {errors.postalCode ?
                    <Field name="postalCode" className="form-control" placeholder={errors.postalCode} style={{borderColor:'red', float:'left', marginRight:'5%'}}/>
                       :
                    <Field name="postalCode" className="form-control" placeholder="Kod pocztowy"/>}
                    </div>
                    <div style={{width:'35%', float:'left', marginRight:'5%'}}>
                    {errors.city ?
                    <Field name="city" className="form-control" placeholder={errors.city} style={{borderColor:'red'}}/>
                       :
                    <Field name="city" className="form-control" placeholder="Miasto"/>}
                    </div>
                    </div>
                    <label>E-mail</label>
                    {errors.email ?
                    <Field name="email" className="form-control" placeholder={errors.email} style={{borderColor:'red'}}/>
                       :
                    <Field name="email" className="form-control" placeholder="E-mail"/>}
                    <label>Numer telefonu</label>
                    {errors.phone ?
                    <Field name="phone" className="form-control" placeholder={errors.phone} style={{borderColor:'red'}}/>
                       :
                    <Field name="phone" className="form-control" placeholder="Numer telefonu"/>}
                    </div><br/>
                    <Button type="submit" style={{marginRight:'16%'}}>Zarejestruj</Button>
                </Form>
                </Card>
            )}
        </Formik>
        </Fragment>
    );
}
export default RegisterPage;