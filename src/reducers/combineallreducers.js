import { combineReducers } from "redux";
import allProductsReducer from "./allproductsreducer";
import productClickedReducer from './productclickedreducer'

const combineallreducers = combineReducers({
allproductsreducer:allProductsReducer,
productClicked:productClickedReducer
})
export default combineallreducers