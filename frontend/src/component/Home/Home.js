import React, { Fragment, useEffect } from 'react'
import "./Home.scss"

// making component of product to use it multiple times
import Product from "./Product.js"

import MetaData from '../layout/MetaData'

import {getProduct} from "../../actions/productActions"

import {useSelector,useDispatch} from "react-redux"

import Loader from '../layout/Loader/Loader'

// import { useAlert } from 'react-alert'
// useDispatch is used to get the data in the state of redux
// use selector is used to send the data from state to the real time data 


// we are not having product right now because we have not used redux so we are makin a rough product
// const product={
//     name:"Blue Tshirt",
//     images:[{url:"https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/tr:h-400,w-300,cm-pad_resize/135a6caAditya-VXKCCRGPK26620_1.jpg?rnd=20200526195200"}],
//     price:"$10",
//     _id:"Wahid"
// }


// using react icons package
// import {Cgmouse} from "react-icons/cg"

// we need a banner in home page
// <Fragment>= it is an empty tag and is equal to <>

const Home = () => {


    // const alert=useAlert()

   
    // redux module
    // use selector is used to send the data from state to the real time data 
    const {loading,error,products}=useSelector((state)=>state.products)



    // redux module
    const dispatch=useDispatch()

    // useEffect already used in app js
    useEffect(()=>{
        // if(error)
        // {
        //     return alert.error(error)
        // }
        dispatch(getProduct())
    },[dispatch])//,error 
    
    return (
      <Fragment>
        {loading ? <Loader/>:<Fragment>
        <MetaData title="ECOMMERCE"/>
        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container" >
                <button>
                    {/* Scroll <Cgmouse/> */}
                    Scroll
                </button>
            </a>
        </div>

        <h2 className='homeheading'>Featured Products</h2>

        <div className="container" id="container">
            {/* use of map func, passing design and if any design is found then we are redering it */}
            {products && products.map((product)=><Product product={product}/>)}
        </div> 

     </Fragment>}
      </Fragment>
  )
}

export default Home
