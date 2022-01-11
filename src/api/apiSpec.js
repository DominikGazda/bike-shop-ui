import { HttpOperation } from "../api/apiConst";

const API = {

  LOGIN: {
    url: `http://localhost:8765/api/react/user/login`,
    operation: HttpOperation.post,
  },
  REGISTER: {
    url: `http://localhost:8765/api/users`,
    operation: HttpOperation.post,
  },
  USER_DETAILS: {
    url: `http://localhost:8765/api/users`,
    operation: HttpOperation.get,
  },
  USER_ORDER: {
    url: `http://localhost:8765/api/orders/user`,
    operation: HttpOperation.post,
  },
  ADMIN_ORDER: {
    url: `http://localhost:8765/api/adm/orders`,
    operation: HttpOperation.get,
  },
  BIKE_PARTS_NAMES: {
    url: `http://localhost:8765/api/bike/parts/names`,
    operation: HttpOperation.get,
  },
  BIKE_NAMES_CONTAINS: {
    url: `http://localhost:8765/api/bikes/sort/name`,
    operation: HttpOperation.get,
  },
  BIKE_DETAILS_BY_NAME: {
    url: `http://localhost:8765/api/bikes`,
    operation: HttpOperation.get,
  },
  CHANGE_ORDER: {
    url: `http://localhost:8765/api/orders/status`,
    operation: HttpOperation.post,
  },
  DELETE_ORDER: {
    url: `http://localhost:8765/api/orders`,
    operation: HttpOperation.delete,
  },
  ADD_BIKE: {
    url: `http://localhost:8765/api/adm/bike`,
    operation: HttpOperation.post,
  },
  UPDATE_USER:{
    url: `http://localhost:8765/api/users/save`,
    operation: HttpOperation.post
  },
  ADD_BIKE_PART:{
    url: `http://localhost:8765/api/adm/bike/part`,
    operation: HttpOperation.post
  },
  ADD_ACCESSORIES:{
    url: `http://localhost:8765/api/adm/accessories`,
    operation: HttpOperation.post
  },
  ADD_WORKSHOP:{
    url: `http://localhost:8765/api/adm/workshop`,
    operation: HttpOperation.post
  },
  DELETE_BIKE:{
    url:`http://localhost:8765/api/adm/bike`,
    operation: HttpOperation.delete
  },
  DELETE_ACCESSORIES:{
    url:`http://localhost:8765/api/adm/accessories`,
    operation: HttpOperation.delete
  },
  DELETE_WORKSHOP:{
    url:`http://localhost:8765/api/adm/workshop`,
    operation: HttpOperation.delete
  },
  DELETE_PARTS:{
    url:`http://localhost:8765/api/adm/bike/part`,
    operation: HttpOperation.delete
  },
  MODIFY_BIKES:{
    url:`http://localhost:8765/api/adm/bike/save`,
    operation: HttpOperation.post
  },
  MODIFY_BIKE_PART:{
    url: `http://localhost:8765/api/adm/bike/part/save`,
    operation: HttpOperation.post
  },
  MODIFY_ACCESSORIES:{
    url: `http://localhost:8765/api/adm/accessories/save`,
    operation: HttpOperation.post
  },
  MODIFY_WORKSHOP:{
    url: `http://localhost:8765/api/adm/workshop/save`,
    operation: HttpOperation.post
  },
  USERS_SEARCH:{
    url: `http://localhost:8765/api/adm/users/sort`,
    operation: HttpOperation.get
  },
  ADD_SERVICE:{
    url: `http://localhost:8765/api/users/service`,
    operation: HttpOperation.post
  },
  SHOW_SERVICE:{
    url: `http://localhost:8765/api/users/service`,
    operation: HttpOperation.get
  },
  USED_HOURS:{
    url: `http://localhost:8765/api/users/service/hours`,
    operation: HttpOperation.get
  },
  DELETE_HOURS:{
    url: `http://localhost:8765/api/users/service`,
    operation: HttpOperation.delete
  },
  BLOCK_USER:{
    url: `http://localhost:8765/api/adm/users/modify`,
    operation: HttpOperation.post
  }
};

export default API;
