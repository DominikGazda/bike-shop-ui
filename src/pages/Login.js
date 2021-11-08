import React, {Fragment} from 'react';
import { Card, TextField } from "@material-ui/core";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useLocation } from 'react-router';
import apiSpec from '../api/apiSpec';
import { useMemo,useState ,useEffect, useCallback } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SinginSchema = Yup.object().shape({
    login: Yup.string()
    .required('Pole login jest wymagane')
    .min(2, ({min}) => `Pole musi zawierać ${min} znaki`),
    password: Yup.string()
    .required('Hasło nie może być puste')
})

const Login = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    let adminLogin = false;

    if(location.pathname.includes('adm')){
        adminLogin = true;
    }

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
          const data = response.data;
          console.log(data);
          dispatch({type:'LOGIN', login, password, isLoggedIn:true, jwt:data});
          setIsLoading(false);
      } catch(error){
       }
      });

    return (
        <Fragment>
            {adminLogin ?<center><h1 style={{marginTop:'2.7%'}}>Logowanie administratora</h1></center>:<center><h1 style={{marginTop:'2.7%'}}>Logowanie użytkownika</h1></center>}
            
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={SinginSchema}
            onSubmit = {(values ,{validate}) => {
                console.log({...values});
                fetchApi(values);
                
            }}
        >
            {({errors}) => (
                <Card style={{height:'30%', width:'30%', marginTop:'4%', marginLeft:'35%', borderRadius:'25px', padding:'1%'}}>
                <Form>
                    <div className="form-group">
                    <label>Login</label>
                    {errors.login ?
                    <Field name="login" className="form-control" placeholder={errors.login} style={{borderColor:'red'}}/>
                       :
                    <Field name="login" className="form-control" placeholder="Login"/>}
                    <label>Hasło</label>
                    {errors.password ?
                       <Field type="password" name="password" className="form-control" placeholder={errors.password} style={{borderColor:'red'}}/>
                       :
                    <Field type="password" name="password" className="form-control" placeholder="Hasło"/>}
                    </div><br/>
                    <Button type="submit" style={{marginRight:'16%'}}>Zaloguj</Button>
                    <Link to="register">
                        <Button>Zrejestruj</Button>
                    </Link>
                </Form>
                </Card>
            )}
        </Formik>
        </Fragment>
    );
}
export default Login;