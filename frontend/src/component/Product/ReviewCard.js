import React from 'react'

import ReactStars from "react-rating-stars-component";

import  profilePng from "../../images/profile.png"


// we are accessing the review from the arrow function
const ReviewCard = ({review}) => {
    
    const options = {
        // it will make all the satrs empty
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: review.rating,
        isHalf: true,
        // if size of window is less then 600px(using media query)
        size: window.innerWidth < 600 ? 20 : 25,
      };

  return (
    <div className='reviewCard'>
        <img src= {profilePng} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
