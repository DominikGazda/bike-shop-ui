import React, {Fragment} from 'react';
import { Card, TextField } from "@material-ui/core";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useHistory, useLocation } from 'react-router';
import apiSpec from '../api/apiSpec';
import { useMemo,useState ,useEffect, useCallback } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, Paper, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

const AccountOptions = (props) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const [errorMessage, setErrormessage] = useState('');
    const user = {...props.userDetails};
    const SinginSchema = Yup.object().shape({
        login: Yup.string()
        .required('Pole login jest wymagane')
        .min(2, ({min}) => `Pole musi zawierać ${min} znaki`),
        password: Yup.string()
        .required('Hasło nie może być puste')
    })

    const fetchApi = useCallback(async({login, password}) => {
        try{
          setIsLoading(true);
          const response = await axios({
              method: apiSpec.LOGIN.operation,
              url: apiSpec.LOGIN.url,
              headers:{
                  'Content-Type': 'application/json',
              },
              data:{
                  username: login,
                  password
              }
          });
          console.log(response.status);
          const data = response.data;
           const isAdmin = jwt_decode(data).authorities.map((auth) => {
            console.log(auth);
            if (auth.authority === "ROLE_ADMIN") {
                return true;
            } else {
                return false;
            }})[0]; 
          dispatch({type:'LOGIN', login, password, isLoggedIn:true, isAdmin, jwt:data});
          setIsLoading(false);
      } catch(error){
          if(error.response.status === 403){
              setErrormessage('Niepoprawny login, lub hasło. Spróbuj ponownie');
              setOpen(true);
          }
       }
      });

    return (
          <Fragment>
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
                console.log({...values});
                // fetchApi(values);
                
            }}
        >
            {({errors}) => (
                <Card style={{height:'100%', width:'100%', marginTop:'4%', borderRadius:'25px', padding:'1%'}}>
                   
                <Form>
                <Row>
                <Col md={6}>
                    <div className="form-group">
                    <label>Hasło</label>
                    <Field type="password" name="password_user" className="form-control" placeholder={user.username} disabled={true}/>
                    <label>Imię</label>
                    <Field type="name_user" name="name_user" className="form-control" placeholder={user.name} disabled={true}/>
                     <label>Nazwisko</label>
                    <Field name="surname_user" className="form-control" placeholder={user.surname} disabled={true}/>
                     <label>Ulica</label>
                    <Field name="street_user" className="form-control" placeholder={user.address?.street} disabled={true}/>
                     <label>Numer domu/ Numer lokalu</label>
                    <Field name="house_local_numer_user" className="form-control" placeholder={`${user.address?.houseNumber} / ${user.address?.localNumber}`} disabled={true}/>
                     <label>Kod pocztowy</label>
                    <Field name="zipCode_user" className="form-control" placeholder={user.address?.zipCode} disabled={true}/>
                     <label>E-mail</label>
                    <Field name="email_user" className="form-control" placeholder={user.address?.email} disabled={true}/>
                     <label>Numer telefonu</label>
                    <Field name="phone_user" className="form-control" placeholder={user.address?.phone} disabled={true}/>
                    </div><br/>
                    </Col>
                    <Col md={6}>
                    <div className="form-group">
                    <br/>
                    {errors.login ?
                    <Field name="login" className="form-control" placeholder={errors.login} style={{borderColor:'red'}}/>
                       :
                    <Field name="login" className="form-control" placeholder="Login"/>}
                    <br/>
                    {errors.password ?
                       <Field type="password" name="password" className="form-control" placeholder={errors.password} style={{borderColor:'red'}}/>
                       :
                    <Field type="password" name="password" className="form-control" placeholder="Hasło"/>}
                     <br/>
                    {errors.login ?
                    <Field name="login" className="form-control" placeholder={errors.login} style={{borderColor:'red'}}/>
                       :
                    <Field name="login" className="form-control" placeholder="Login"/>}
                     <br/>
                    {errors.login ?
                    <Field name="login" className="form-control" placeholder={errors.login} style={{borderColor:'red'}}/>
                       :
                    <Field name="login" className="form-control" placeholder="Login"/>}
                    <br/>
                    {errors.login ?
                    <Field name="login" className="form-control" placeholder={errors.login} style={{borderColor:'red'}}/>
                       :
                    <Field name="login" className="form-control" placeholder="Login"/>}
                     <br/>
                    {errors.login ?
                    <Field name="login" className="form-control" placeholder={errors.login} style={{borderColor:'red'}}/>
                       :
                    <Field name="login" className="form-control" placeholder="Login"/>}
                     <br/>
                    {errors.login ?
                    <Field name="login" className="form-control" placeholder={errors.login} style={{borderColor:'red'}}/>
                       :
                    <Field name="login" className="form-control" placeholder="Login"/>}
                     <br/>
                    {errors.login ?
                    <Field name="login" className="form-control" placeholder={errors.login} style={{borderColor:'red'}}/>
                       :
                    <Field name="login" className="form-control" placeholder="Login"/>}
                    </div><br/>
                    </Col>
                    </Row>
                    <Button type="submit" style={{marginRight:'16%'}}>Zaloguj</Button>
                    <Link to="register">
                        <Button>Zrejestruj</Button>
                    </Link>
                </Form>
                </Card>
            )}
        </Formik>
        </Fragment>
    )
}

export default AccountOptions;