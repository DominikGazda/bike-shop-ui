import { Card } from "@material-ui/core";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useHistory, useLocation } from 'react-router';
import apiSpec from '../api/apiSpec';
import { useState, useCallback, Fragment } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const AccountOptions = (props) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [errorMessage, setErrormessage] = useState('');
    const jwt = useSelector(state => state.userLogin.jwt);

    const [passwordChange, setPassowrdChange] = useState(false);
    const [personalDataChange, setPersonalDataChange] = useState(false);
    const [addressChange, setAddressChange] = useState(false);

    const user = {...props.userDetails};
    const SinginSchema = Yup.object().shape({
        old_password_user: Yup.string()
        // .required('Hasło nie może być puste')
        .test(
           'New password fields cannot be empty','Wprowadź nowe hasło poprawnie', function(item){
            const isNewPasswordEmpty = this.parent.new_password_user?.trim().length === 0 || this.parent.new_password_user == undefined;
            const isNewPasswordAgainEmpty = this.parent.new_password_user_again?.trim().length === 0 || this.parent.new_password_user_again == undefined;
            const isOldPasswordNotEmpty = item?.trim().length !== 0 && item !== undefined;

            if((isNewPasswordEmpty || isNewPasswordAgainEmpty) && isOldPasswordNotEmpty){
                return false;
            } else {
                return true;
            }
           }
        ),
        new_password_user: Yup.string()
        .test(
            'New password must be equal new password user again','Nowe hasło musi być takie samo w obu polach',
            function(item){
                if(item === this.parent.new_password_user_again){
                    return true;
                } else {
                    return false;
                }
            }
        )
    })

    const handleChangePassword = () => {
        setPassowrdChange(true);
    }

    const handleChangePersonalData = () => {
        setPersonalDataChange(true);
    }

    const handleChangeAddress = () => {
        setAddressChange(true);
    }

    
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const fetchApi = useCallback(async(pointer, values) => {
        try{
          setIsLoading(true);
          const response = await axios({
              method: apiSpec.UPDATE_USER.operation,
              url: apiSpec.UPDATE_USER.url,
              headers:{
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${jwt}`
              },
               params:{
                    pointer
              },
              data:{
                ...values
              }
          });
          console.log(response.status);
          const data = response.data;
          setIsLoading(false);
      } catch(error){
          if(error.response.status === 403){
              setErrormessage('Podałeś błędne hasło do swojego konta. Spróbuj ponownie');
              setOpen(true);
          }
       }
      });

    return (
          <Fragment>
        <Formik
            initialValues={{
                old_password_user: '',
                new_password_user:'',
                new_password_user_again:'',

                name_user: '',
                surname_user: '',

                street_user:'',
                house_local_numer_user:'',
                zipCode_user:'',
                email_user:'',
                phone_user:''
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={SinginSchema}
            onSubmit = {(values ,{validate}) => {
                let savePointer = '';
                if(passwordChange)
                    savePointer = '/password';
                if(personalDataChange)
                    savePointer = '/details';
                if(addressChange)
                    savePointer = '/address';

                const houseNumber = values.house_local_numer_user.trim().split("/")[0];
                const localNumber =  values.house_local_numer_user.trim().split("/")[1];  
   
                const request = {
                    username: user.username,
                    oldPassword: values.old_password_user,
                    password: values.new_password_user,
                    name: values.name_user,
                    surname: values.surname_user,
                    address:{
                        name: user.name,
                        surname: user.surname,
                        street: values.street_user,
                        houseNumber,
                        localNumber,
                        zipCode: values.zipCode_user,
                        city: values.city_user,
                        email: values.email_user,
                        phone: values.phone_user
                    }
                }
                    
                fetchApi(savePointer, request);

                setPassowrdChange(false);
                setPersonalDataChange(false);
                setAddressChange(false); 
                history.push("/login");   
            }}
        >
            {({errors}) => (
                <Card style={{height:'100%', width:'100%', marginTop:'4%', borderRadius:'25px', padding:'1%'}}>
                   
                <Form>
                <Row>
                <Col md={6}>
                    <div className="form-group">
                    <h3>Zmiana hasła</h3>
                    <Field type="password" name="old_password_user" className="form-control" placeholder="Stare hasło"/><br/>
                    <Field type="password" name="new_password_user" className="form-control" placeholder="Nowe hasło"/><br/>
                    <Field type="password" name="new_password_user_again" className="form-control" placeholder="Powtórz nowe hasło"/><br/>
                    {errors.old_password_user && <p class="alert alert-danger">{errors.old_password_user}</p>}
                    {errors.new_password_user && <p class="alert alert-danger">{errors.new_password_user}</p>}
                    </div>
                    <Button type="submit" name="change_password" onClick={handleChangePassword} style={{marginRight:'16%'}}>Zmień hasło</Button>
                    </Col>
                </Row>

                <Row style={{marginTop:'5%'}}>
                <h3>Zmiana danych osobowych</h3>
                <Col md={6}>
                    <div className="form-group">
                        <label>Imię</label>
                        <Field type="name" name="name" className="form-control" placeholder={user.name} disabled={true}/>
                        <label>Nazwisko</label>
                        <Field name="surname" className="form-control" placeholder={user.surname} disabled={true}/><br/>
                    <Button type="submit" onClick = {handleChangePersonalData} style={{marginRight:'16%'}}>Zmień dane osobowe</Button>
                    </div>
                    </Col>
                <Col md={6}>
                    <div className="form-group">
                        <label>Imię</label>
                        <Field type="name_user" name="name_user" className="form-control"/>
                        <label>Nazwisko</label>
                        <Field name="surname_user" className="form-control" />
                        {errors.name_user && <p class="alert alert-danger">{errors.name_user}</p>}
                        {errors.surname_user && <p class="alert alert-danger">{errors.surname_user}</p>}
                    </div>
                    </Col>
                </Row>

                <Row style={{marginTop:'5%'}}>
                <h3>Zmiana danych adresowych</h3>
                <Col md={6}>
                    <div className="form-group">
                    <label>Ulica</label>
                    <Field name="street" className="form-control" placeholder={user.address?.street} disabled={true}/>
                     <label>Numer domu/ Numer lokalu</label>
                    <Field name="house_local_numer" className="form-control" placeholder={`${user.address?.houseNumber} / ${user.address?.localNumber}`} disabled={true}/>
                     <label>Kod pocztowy</label>
                    <Field name="zipCode" className="form-control" placeholder={user.address?.zipCode} disabled={true}/>
                    <label>Miasto</label>
                    <Field name="city" className="form-control" placeholder={user.address?.city} disabled={true}/>
                     <label>E-mail</label>
                    <Field name="email" className="form-control" placeholder={user.address?.email} disabled={true}/>
                     <label>Numer telefonu</label>
                    <Field name="phone" className="form-control" placeholder={user.address?.phone} disabled={true}/><br/>
                    <Button type="submit" onClick={handleChangeAddress} style={{marginRight:'16%'}}>Zmień dane adresowe</Button>
                    </div>
                    </Col>
                <Col md={6}>
                    <div className="form-group">
                    <label>Ulica</label>
                    <Field name="street_user" className="form-control"/>
                     <label>Numer domu/ Numer lokalu</label>
                    <Field name="house_local_numer_user" className="form-control" />
                     <label>Kod pocztowy</label>
                    <Field name="zipCode_user" className="form-control" />
                    <label>Miasto</label>
                    <Field name="city_user" className="form-control" />
                     <label>E-mail</label>
                    <Field name="email_user" className="form-control"/>
                     <label>Numer telefonu</label>
                    <Field name="phone_user" className="form-control" /><br/>
                    {errors.street_user && <p class="alert alert-danger">{errors.street_user}</p>}
                    {errors.house_local_numer_user && <p class="alert alert-danger">{errors.house_local_numer_user}</p>}
                    {errors.zipCode_user && <p class="alert alert-danger">{errors.zipCode_user}</p>}
                    {errors.email_user && <p class="alert alert-danger">{errors.email_user}</p>}
                    {errors.phone_user && <p class="alert alert-danger">{errors.phone_user}</p>}
                    {errors.city_user && <p class="alert alert-danger">{errors.city_user}</p>}
                    </div>
                    </Col>
                </Row>
                </Form>
                </Card>
            )}
        </Formik>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar} style={{zIndex:'2'}}>
            <Alert onClose={handleCloseSnackbar} severity="warning" style={{zIndex:'1000', position:'relative'}}>
                {errorMessage}
          </Alert>
      </Snackbar>
        </Fragment>
    )
}

export default AccountOptions;