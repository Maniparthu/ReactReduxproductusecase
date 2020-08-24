import { combineReducers } from "redux";
import allProductsReducer from "./allproductsreducer";
import productClickedReducer from './productclickedreducer'
import editproductClickedReducer from './editclickedreducer'

const combineallreducers = combineReducers({
allproductsreducer:allProductsReducer,
productClicked:productClickedReducer,
editProductclicked:editproductClickedReducer
})
export default combineallreducers