import React from "react";
import { Link } from "react-router-dom";

import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const options = {
    // it will make all the satrs empty
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    // if size of window is less then 600px(using media query)
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <Link className="productCard" to={`/designs/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        {/* we will make options */}
        {/* currently we are giving static value of reviews but later we will show real time values */}
        <ReactStars {...options} /> <span>({product.noOfReviews} reviews)</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};

export default Product;
