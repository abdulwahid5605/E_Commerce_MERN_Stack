// in state we have passed empty array of products
import {ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,

     CLEAR_ERRORS} from "../constants/productConstants"

export const productReducer=(state={design:[]},action)=>
    {
        switch (action.type) {
            //we have passed ALL_PRODUCT_FAIL as a variable. However, it can be passed as a string. We have passed vaiable to overcome mistakes.
            // returning an object

            case ALL_PRODUCT_FAIL:
                return{
                    loading:false,

                    // we will make this function in actions folder
                    error:action.payload 
                }
            case ALL_PRODUCT_REQUEST:
                return{
                    loading:true,
                    // we will return array of products while requesting
                    products:[]
                }

            case ALL_PRODUCT_SUCCESS:
                return{
                    loading:false,
                    products:action.payload.design,
                    productsCount:action.payload.productsCount,
                    resultPerPage:action.payload.resultPerPage,
                    // we will make the function "action.payload.productsCount" in actions folder
                    // productsCount:action.payload.productsCount

                    // filteredDesignsCount:action.payload.filteredDesignsCount,
                }

            case CLEAR_ERRORS:
                return {
                    // returning state and nulling errors
                    ...state,
                    error:null 
                }
            
        
            default:
                return state;
        }
    }


    export const productDetailsReducer=(state={design:{}},action)=>
    {
        switch (action.type) {
            //we have passed ALL_PRODUCT_FAIL as a variable. However, it can be passed as a string. We have passed vaiable to overcome mistakes.
            // returning an object

            case PRODUCT_DETAILS_FAIL:
                return{
                    loading:false,

                    // we will make this function in actions folder
                    error:action.payload 
                }
            case PRODUCT_DETAILS_REQUEST:
                return{
                    loading:true,
                    // we will return array of products while requesting
                    ...state
                }

            case PRODUCT_DETAILS_SUCCESS:
                return{
                    loading:false,
                    design:action.payload,
                    // we will make the function "action.payload.productsCount" in actions folder
                    // productsCount:action.payload.productsCount
                }

            case CLEAR_ERRORS:
                return {
                    // returning state and nulling errors
                    ...state,
                    error:null 
                }
            
        
            default:
                return state;
        }
    }    