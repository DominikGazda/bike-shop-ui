import * as React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import DateAdapter from '@mui/lab/AdapterMoment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import moment from 'moment';
import { DatePicker } from '@mui/lab';
import { useSelector } from 'react-redux';
import apiSpec from '../api/apiSpec';
import axios from 'axios';
import { useCallback, useState, useRef } from "react";


const UserService = (props) => {
    const [date, setDate] = React.useState(moment(new Date()));
    const [time, setTime] = React.useState(moment(new Date()).format("YYYY/MM/DD HH:00"));
    const jwt = useSelector(state => state.userLogin.jwt);
    const [services, setServices] = useState([]);
    const [usedHours, setUsedHours] = useState([]);
    const timeRef = useRef();
    const [error, setError] = useState('');
    let timeAfterModify = '';

  const handleChange = (newValue) => {
    setTime(newValue);
    // console.log(newValue)
  };
    const userDetails = {...props.userDetails};

    const excludeTimes =(data)=>{
        // console.log(data);
    }

    const sendDate = async() => {
        setError('');
        let modifiedTime = moment(time, moment.ISO_8601).format("HH:00");
        if(modifiedTime.toString().includes("Invalid")){
            modifiedTime = moment(new Date(), moment.ISO_8601).format("HH:00");
        } else {
            modifiedTime = moment(time, moment.ISO_8601).format("HH:00")
        }

        let servicesDates = services.map(service => service.date +' '+ service.time);
        let dateToSave = moment(date, moment.ISO_8601).format("YYYY-MM-DD") + ' ' + modifiedTime;

        if(servicesDates.includes(dateToSave)){
            setError('Ta godzina została już zarezerwowana.')
            return;
        }

        const serviceRequest = {
            userId: userDetails.id,
            date: moment(date, moment.ISO_8601).format("YYYY-MM-DD"),
            time: modifiedTime
        }
        await saveServiceApi(serviceRequest);
        showServicesApi(userDetails.id);
            
    }

    const deleteServiceApi = async(id) => {
        const response = await axios({
            url: apiSpec.DELETE_HOURS.url,
            method: apiSpec.DELETE_HOURS.operation,
            headers:{
                'Authorization':`Bearer ${jwt}`
            },
            params:{
                id
            }
        })
        const data = response.data;
        showServicesApi(userDetails.id)
    }

    const uplaodUsedHours = useCallback(async(datee) =>{
       
        const formattedDate = moment(datee, moment.ISO_8601).format("YYYY-MM-DD");
        
        const response = await axios({
            url: apiSpec.USED_HOURS.url,
            method: apiSpec.USED_HOURS.operation,
            headers:{
                'Authorization':`Bearer ${jwt}`
            },
            params:{
                date:formattedDate
            }
            
        })
        const data = response.data;
        setUsedHours(data);
    })

    const saveServiceApi = useCallback(async(serviceRequest) => {
        const response = await axios({
            url: apiSpec.ADD_SERVICE.url,
            method: apiSpec.ADD_SERVICE.operation,
            headers:{
                'Authorization':`Bearer ${jwt}`
            },
            data:{
                ...serviceRequest
            }
        })
        const data = response.data;
    })

    const showServicesApi = useCallback(async(userId) => {
        const response = await axios({
            url: apiSpec.SHOW_SERVICE.url,
            method: apiSpec.SHOW_SERVICE.operation,
            headers:{
                'Authorization':`Bearer ${jwt}`
            },
            params:{
                userId: userDetails.id
            }
        })
        const data = response.data;
        setServices(data);
    })

    React.useEffect(() => {
        showServicesApi(userDetails.id);
        uplaodUsedHours(date)
        timeAfterModify = time.toString().split(" ")[1];
    },[time])

    return (
        <React.Fragment>
            <Card>
            <h3>Wybierz datę serwisu</h3>
            <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={3}>
                    <DatePicker
                        value={date}
                        disablePast={true}
                        onChange={(newValue) => {
                        setDate(newValue);
                        uplaodUsedHours(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                       <TimePicker
                        mode={24}
                        value={time}
                        ref={timeRef}
                        onChange={handleChange}
                        shouldDisableTime ={(timeValue, clockType) => {
                            return (clockType === 'minutes' && timeValue >= 0) || (clockType === 'hours' && usedHours.includes(timeValue.toString()+':00'));
                        }}
                        views={'hours'}
                        ampm={false}
                        renderInput={(params) => <TextField {...params} />}
                        />
            </Stack>
            </LocalizationProvider><br/>
            <p class="btn btn-alert">{error}</p>
            <Button type="submit" onClick={sendDate}>Umów wizytę</Button><br/>
            <h4>Umówione wizyty</h4>
            {services?.map(service => (
                <Row class={{margin:'2%'}}>
                    <Col md={6}>
                        <h5>{moment(service.date, moment.ISO_8601).format("YYYY/MM/DD")}  <b>{service.time}</b></h5>
                    </Col>
                    <Col md={6}>
                        <Button class="btn btn-danger" onClick={() => {deleteServiceApi(service.id)}}>Skasuj</Button>
                    </Col>
                </Row>
            ))}
            </Card>
        </React.Fragment>
      );
}
export default UserService;