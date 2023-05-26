import React, { Fragment, useState } from 'react'

import "./Search.css"

import MetaData from "../layout/MetaData";


const Search = ({history}) => {

  // const history=useHistory()

  const [keyword,setKeyword]=useState("")

  const searchSubmitHandler=(e)=>{
    // preventDefault=> it helps to stop the reloading while submitting a form
    e.preventDefault()

    // if keyword exists
    // what is function of trim=> it will help us to seach the words not empty spaces
    if(keyword.trim())
    {
      history.push(`/products/${keyword}`)
    }

    else
    {
      history.push("/products")
    }
  }

  return (
    <Fragment>
      <MetaData title="SEARCH A PRODUCT -- ECOMMERCE"/>

      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input 
        type="text"
        placeholder='Search a product...'
        onChange={(e)=>setKeyword(e.target.value)}/>

        <input type="Submit" value="Search" />

      </form>
    </Fragment>
  )
}

export default Search
