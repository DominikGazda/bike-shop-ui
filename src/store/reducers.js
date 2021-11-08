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

export function userLogin (state={login:"", password:"", isLoggedIn:false, jwt:''}, action){
  if(action.type === 'LOGIN'){
    return {
      ...state,
      login: action.login,
      password: action.password,
      isLoggedIn:true,
      jwt: action.jwt
    }
  } else if(action.type === 'LOGOUT'){
    return {
      ...state,
      login:'',
      password:'',
      isLoggedIn:false,
      jwt:''
    }
  }
  return state;
}

const DUMMY_BIKES = [
  {
    id: "bike1",
    name: "Rower elektryczny R-RAYMON CrossRay E 7.0",
    price: 12000,
    image: "./../../assets/bike.png",
    itemAmount:0,
    type:"bike"
  },
  {
    id: "bike2",
    name: "Rower KANDS MTB 5000",
    price: 13000,
    image: "./../../assets/bike.png",
    itemAmount:0,
    type:"bike"
  },
  {
    id: "bike3",
    name: "Rower KANDS CROSS WTS9322 0222",
    price: 14000,
    image: "./../../assets/bike.png",
    itemAmount:0,
    type:"bike"
  },
  {
    id: "bike4",
    name: "Rower Kolareczka prosto ze sklepu",
    price: 14000,
    image: "./../../assets/bike.png",
    itemAmount:0,
    type:"bike"
  },
  {
    id: "bike5",
    name: "Rower GRAVEL 5.0 totalnie kozacki",
    price: 14000,
    image: "./../../assets/bike.png",
    itemAmount:0,
    type:"bike"
  },
];

const DUMMY_PARTS = [
  {
    id: "part1",
    name: "Część rowerowa numer jeden",
    price: 12000,
    image: "./../../assets/part.png",
    itemAmount:0,
    type:"parts"
  },
  {
    id: "part2",
    name: "Część rowerowa numer dwa",
    price: 13000,
    image: "./../../assets/part.png",
    itemAmount:0,
    type:"parts"
  },
  {
    id: "part3",
    name: "Część rowerowa numer trzy",
    price: 14000,
    image: "./../../assets/part.png",
    itemAmount:0,
    type:"parts"
  },
  {
    id: "part4",
    name: "Część rowerowa numer cztery",
    price: 14000,
    image: "./../../assets/part.png",
    itemAmount:0,
    type:"parts"
  },
  {
    id: "part5",
    name: "Część rowerowa numer pięć",
    price: 14000,
    image: "./../../assets/part.png",
    itemAmount:0,
    type:"parts"
  }
];

const DUMMY_ACCESORIES = [
  {
    id: "acc1",
    name: "Pompka rowerowa",
    price: 12000,
    image: "./../../assets/pompka.png",
    itemAmount:0,
    type:"accessories"
  },
  {
    id: "acc2",
    name: "Łańcuch szimano",
    price: 13000,
    image: "./../../assets/pompka.png",
    itemAmount:0,
    type:"accessories"
  },
  {
    id: "acc3",
    name: "Przerzuta szimanoh",
    price: 14000,
    image: "./../../assets/pompka.png",
    itemAmount:0,
    type:"accessories"
  },
  {
    id: "acc4",
    name: "Kozackie przerzutki ",
    price: 14000,
    image: "./../../assets/pompka.png",
    itemAmount:0,
    type:"accessories"
  },
  {
    id: "acc5",
    name: "Pedały też z szimano normalnie",
    price: 14000,
    image: "./../../assets/pompka.png",
    itemAmount:0,
    type:"accessories"
  }
];

const DUMMY_WORKSHOP = [
  {
    id: "shop1",
    name: "Olejek do smarowania numer jeden",
    price: 12000,
    image: "./../../assets/shop.png",
    itemAmount:0,
    type:"accessories"
  },
  {
    id: "shop2",
    name: "Olejek do smarowania numer dwa",
    price: 13000,
    image: "./../../assets/shop.png",
    itemAmount:0,
    type:"accessories"
  },
  {
    id: "shop3",
    name: "Olejek do smarowania numer trzy",
    price: 14000,
    image: "./../../assets/shop.png",
    itemAmount:0,
    type:"accessories"
  },
  {
    id: "shop4",
    name: "Olejek do smarowania numer cztery",
    price: 14000,
    image: "./../../assets/shop.png",
    itemAmount:0,
    type:"accessories"
  },
  {
    id: "shop5",
    name: "Olejek do smarowania numer pięć",
    price: 14000,
    image: "./../../assets/shop.png",
    itemAmount:0,
    type:"accessories"
  }
];