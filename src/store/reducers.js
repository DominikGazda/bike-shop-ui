import { AvTimerOutlined } from "@material-ui/icons";

export default function addItemToCart(
  state = { items: [], itemsCounter: 0, itemsPrice: 0, delivery: {}},
  action
) {
  if (action.type === "ADD_ITEM") {
    //sprawdzenie czy produkt jest już w liście i inkrementacja pola amount
    const existingItem = state.items.find((item) => (item.id === action.itemDetails.item.id && item.itemType === action.itemDetails.item.itemType));
    const tempItemsPrice = Object.values(state.items).reduce((acc, now) => {
      return acc + (now.price * now.itemAmount);
    }, 0);
    // // ustalenie nowej ilości przedmiotów
    const tempItemsCounter = state.items.reduce((acc, now) => {
      return acc + now.itemAmount;
    }, 0);

 
    if(existingItem){
      const existingItemIndex = state.items.findIndex((item) => item.id === action.itemDetails.item.id && item.itemType === action.itemDetails.item.itemType);
     
      const newArray = [...state.items];
      newArray[existingItemIndex].itemAmount += action.itemDetails.amount;
      
      return{
        ...state,
        items: newArray,
        itemsCounter: tempItemsCounter + action.itemDetails.amount,
        itemsPrice: tempItemsPrice + (action.itemDetails.amount * action.itemDetails.item.price)
      }
    } else {
       //wrzucenie do listy nowego przedmiotu
       console.log('nowy element')
       const newArray = state.items.slice();
       const newItem = action.itemDetails.item;
       
       newItem.itemAmount = action.itemDetails.amount;
       newArray.push(action.itemDetails.item);
       
       return{
         items: newArray,
         itemsCounter: state.itemsCounter + newItem.itemAmount,
         itemsPrice: tempItemsPrice + (action.itemDetails.amount * action.itemDetails.item.price)
       }
    }
  } else if (action.type === "DELETE_ITEM"){
    const existingItem = state.items.find((item) => item.id === action.itemDetails.item.id && item.itemType === action.itemDetails.item.itemType);
    
    const existingItemIndex = state.items.findIndex((item) => item.id === action.itemDetails.item.id && item.itemType === action.itemDetails.item.itemType);
   
    const newItems = [...state.items];
    
    if(existingItem.itemAmount === 1){
      const filteredArray = newItems.filter((item) => !(item.id === action.itemDetails.item.id && item.itemType === action.itemDetails.item.itemType));
      
      return{
        items: filteredArray,
        itemsCounter: state.itemsCounter - action.itemDetails.amount,
        itemsPrice: state.itemsPrice - (action.itemDetails.amount * action.itemDetails.item.price)
      }
    } else {
        newItems[existingItemIndex].itemAmount -= action.itemDetails.amount;
       
        return{
          items: newItems,
          itemsCounter: state.itemsCounter - action.itemDetails.amount,
          itemsPrice: state.itemsPrice - (action.itemDetails.amount * action.itemDetails.item.price)
        }
    }
  } else if (action.type === "CHANGE_AMOUNT"){
    const existingItemIndex = state.items.findIndex((item) => item.id === action.itemDetails.item.id && item.itemType === action.itemDetails.item.itemType);
    
    const newItems = [...state.items];
    newItems[existingItemIndex].itemAmount = action.itemDetails.amount;
    
    const tempItemsPrice = newItems.reduce((acc, now) => {
      return acc + (now.price * now.itemAmount);
    }, 0);
    // // ustalenie nowej ilości przedmiotów
    const tempItemsCounter = newItems.reduce((acc, now) => {
      return acc + now.itemAmount;
    }, 0);
    return{
      items: newItems,
      itemsCounter: tempItemsCounter,
      itemsPrice: tempItemsPrice
    }
  } else if (action.type === "UPDATE_DELIVERY_PRICE") {
    return{
      ...state,
      delivery: {
        price: action.itemDetails.delivery.price,
        name: action.itemDetails.delivery.name
      }
    }
  } else if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items:[],
      itemsCounter:0,
      itemsPrice:0,
      delivery:{}
    }
  } 
  return state;
}

export function fetchItems(state = [], action){

  if(action.type === 'FETCH_BIKES'){
    return DUMMY_BIKES;
  } else if (action.type === 'FETCH_PARTS'){
    return DUMMY_PARTS;
  } else if (action.type === 'FETCH_ACCESSORIES'){
    return DUMMY_ACCESORIES;
  } else if (action.type === 'FETCH_WORKSHOP'){
    return DUMMY_WORKSHOP;
  } else {
    return state;
  }
}

export function fetchBikeDataListFlag(state = {flag:false, value:'', item:{}}, action){
    if(action.type === 'FETCH_FILTERED_BIKES'){
      // console.log(action.value);
      return {
        ...state,
        flag: action.flag,
        value: action.value,
        item: action.item
      }
    }
    return state;
}

export function fetchPartsDataListFlag(state={flag:false, value:'', item:{}}, action){
  if(action.type === 'FETCH_FILTERED_PARTS'){
    return {
      ...state,
      flag: action.flag,
      value: action.value,
      item: action.item
    }
  }
  return state;
}

export function fetchAccessoriesListFlag(state={flag:false, value:'',item:{}}, action){
  if(action.type === 'FETCH_FILTERED_ACCESSORIES'){
    return {
      ...state,
      flag: action.flag,
      value: action.value,
      item: action.item
    }
  }
  return state;
}

export function fetchWorkshopListFlag(state={flag:false,value:'',item:{}}, action){
  if(action.type === 'FETCH_FILTERED_WORKSHOP'){
    return {
      ...state,
      flag: action.flag,
      value: action.value,
      item: action.item
    }
  }
  return state;
}

export function addOrder (state={loading:false}, action){
  if(action.type === 'ADD_ORDER_REQUEST'){
    return {
      ...state,
      loading:true
    }
  } else if (action.type === 'ADD_ORDER_SUCCESS'){
    return {
      ...state,
      loading:false
    }
  }
  return state;
}

export function userLogin (state={login:"", password:"", isLoggedIn:false, isAdmin:false, jwt:''}, action){
  if(action.type === 'LOGIN'){
    return {
      ...state,
      login: action.login,
      password: action.password,
      isLoggedIn:true,
      isAdmin:action.isAdmin,
      jwt: action.jwt
    }
  } else if(action.type === 'LOGOUT'){
    return {
      ...state,
      login:'',
      password:'',
      isLoggedIn:false,
      isAdmin:false,
      jwt:''
    }
  }
  return state;
}

export function modalHandler (state={showModal:false, orderId:0, flag:false}, action){
  if(action.type === 'SHOW_MODAL'){
    return {
      ...state,
      showModal: true,
      orderId: action.orderId
    }
  }
  if(action.type === 'HIDE_MODAL'){
    return {
      ...state,
      showModal: false,
      flag: action.flag
    }
  }
  return state;
}