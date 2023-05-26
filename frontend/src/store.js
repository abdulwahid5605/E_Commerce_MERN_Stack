import {legacy_createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailsReducer, productReducer } from "./reducer/productReducer"
import { userReducer } from "./reducer/userReducer"

// we have to fetch data for multiple files that is why we are using combineReducer
// for single file we use reducers
const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer
})

let initialState={}

const middleware=[thunk]

const store=legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;