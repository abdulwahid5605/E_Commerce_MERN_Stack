    // import { config } from "dotenv"
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../constants/userConstants"

import axios from "axios"


// LOGIN
export const login = (email, password)=>async(dispatch)=>
{
    try {
        dispatch({type:LOGIN_REQUEST})


        const config={headers:{"Content-Type":"application/json"}}

        const {data}=await axios.post(`/api/v1/login`,
        {email,password},
        config)

        dispatch({type:LOGIN_SUCCESS,payload:data.user})


    } catch (error) {
        dispatch({type:LOGIN_FAIL, payload:error.response.data.message})
    }
}

// REGISTER
// user data will come from registerSubmit, we will dispatch data
export const register = (userData)=>async(dispatch)=>
{
    try {

        dispatch({type:REGISTER_REQUEST})

        const config = { headers: { "Content-Type": "multipart/form-data" } };  //multipart/form-data-> beacause image is also included 
        const {data}=await axios.post(`/api/v1/register`,userData,config)
        dispatch({ type: REGISTER_SUCCESS, payload: data.user})

    } catch (error) {
        dispatch({type:REGISTER_FAIL,
        payload: error.response.data.message})
    }
}

// LOAD USER
export const loadUser = ()=>async(dispatch)=>
{
    try {
        dispatch({type:LOAD_USER_REQUEST})



        const {data}=await axios.get(`/api/v1/me`)

        dispatch({type:LOAD_USER_SUCCESS,payload:data.user})


    } catch (error) {
        dispatch({type:LOAD_USER_FAIL, payload:error.response.data.message})
    }
}


// LOGOUT USER
export const logout = ()=>async(dispatch)=>
{
    try {

        // we are not passing data cuz we have not passed payload in reducer
        await axios.get(`/api/v1/logout`)

        dispatch({type:LOGOUT_SUCCESS})


    } catch (error) {
        dispatch({type:LOGOUT_FAIL, payload:error.response.data.message})
    }
}


// CLEARING ERRORS
// it is used to nullify errors
export const clearErrors=()=>async(dispatch)=>
{
    dispatch({type:CLEAR_ERRORS})
}