// In app.js file we use router and import the components that needs to be rendered

import './App.css';

// navbar imported
import Header from "./component/layout/Header/Header.js"

//importing router 
import { BrowserRouter as Router, Route } from 'react-router-dom';

// webfontloader automatically downloads fonts from google
import webFont from "webfontloader"

import React from 'react';
// we are using the font with the help of React useEffect=> it will automatically download the font before the loading of page 

import Footer from "./component/layout/Footer/Footers.js"

// importing Home
import Home from "./component/Home/Home.js"

import ItemDetails from "./component/Product/ItemDetails"

import Products from './component/Product/Products.js';

import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';

import store from "./store"
import {loadUser} from "./actions/userActions"

import UserOptions from "./component/layout/Header/UserOptions.js"

import { useSelector } from 'react-redux';

import Profile from "./component/User/Profile.js"


function App() {


  const {isAuthenticated,user}=useSelector((state)=>state.user)

  React.useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser())
  },[])
  return (
  <Router>
    <Header/>

    {isAuthenticated && <UserOptions user={user} />}
    
    <Route exact path='/' component={Home} /> 
 
    <Route exact path='/designs/:id' component={ItemDetails} /> 

    <Route exact path='/products' component={Products} /> 

    <Route path='/products/:keyword' component={Products} />

    <Route exact path='/search' component={Search} /> 

    <Route exact path="/login" component={LoginSignUp}/>

    <Route exact path="/account" component={Profile}/>



    {/* <Route extact path='/sad' Component={Loader} />  */}


    <Footer/>
  </Router>);
}
export default App;
