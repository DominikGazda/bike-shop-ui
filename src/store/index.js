import { combineReducers, createStore, applyMiddleware } from "redux";
import addItemToCart from "./reducers";
import { fetchItems } from "./reducers";
import { fetchBikeDataListFlag } from "./reducers";
import { fetchPartsDataListFlag } from "./reducers";
import { fetchAccessoriesListFlag } from "./reducers";
import { fetchWorkshopListFlag } from "./reducers";
import { userLogin } from "./reducers";
import { addOrder } from "./reducers";
import {modalHandler} from "./reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  items: addItemToCart,
  fetchItems,
  fetchBikeDataListFlag,
  fetchPartsDataListFlag,
  fetchAccessoriesListFlag,
  addOrder,
  userLogin,
  modalHandler,
  fetchWorkshopListFlag
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
