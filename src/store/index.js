import { combineReducers, createStore, applyMiddleware } from "redux";
import addItemToCart from "./reducers";
import { fetchItems } from "./reducers";
import { fetchBikeDataListFlag } from "./reducers";
import { fetchPartsDataListFlag } from "./reducers";
import { userLogin } from "./reducers";
import { addOrder } from "./reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  items: addItemToCart,
  fetchItems,
  fetchBikeDataListFlag,
  fetchPartsDataListFlag,
  addOrder,
  userLogin
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
