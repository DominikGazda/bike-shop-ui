import {HttpOperation} from '../api/apiConst';

const API = {
    LOGIN: {
        url: `http://localhost:8765/api/react/user/login`,
        operation: HttpOperation.post
    },
    REGISTER: {
        url: `http://localhost:8765/api/users`,
        operation: HttpOperation.post
    },
    USER_DETAILS:{
        url: `http://localhost:8765/api/users`,
        operation: HttpOperation.get
    },
    USER_ORDER:{
        url: `http://localhost:8765/api/orders/user`,
        operation: HttpOperation.post
    }
}

export default API;