import React, { Fragment, useEffect } from "react";


// importing slider
import Carousel from "react-material-ui-carousel";

import "./ItemDetails.css";

import { useDispatch, useSelector } from "react-redux";

// we will use action to fetch the product details
import { getProductDetails } from "../../actions/productActions";

import ReactStars from "react-rating-stars-component";

import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const ItemDetails = ({match}) => {

  const dispatch = useDispatch();

  const { design, loading, error } = useSelector(
    (state) => state.productDetails
  );

  // in  backend we use req.params.id to access the id
  // in  frontend we use match.params.id to access the id

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const options = {
    // it will make all the satrs empty
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    // ratings are not working because we have not applied loader here
    value: design.rating,
    isHalf: true,
    // if size of window is less then 600px(using media query)
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <Fragment>
        {loading ? <Loader/>:
        (<Fragment>
            <MetaData title={`${design.name} ECOMMERCE`}/>

            <div className="productDetails">
              <div className="leftChild">
                <Carousel>
                  {/* applying condition */}
                  {/* where i is index */}
                  {design.images &&
                    design.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>
      
              <div className="rightChild">
                <div className="detailsBlock-1">
                  <h2>{design.name}</h2>
                  <p>Product # {design._id}</p>
                </div>
      
                <div className="detailsBlock_2">
                  <ReactStars {...options} />
                  <span>({design.noOfReviews} Reviews)</span>
                </div>
      
                <div className="detailsBlock_3">
                  <h1>{`$${design.price}`}</h1>
      
                  <div className="detailsBlock_3-1">
                    <div className="detailsBlock_3-1-1">
                      <button>-</button>
                      <input type="number" value="1" />
                      <button>+</button>
                    </div>
                    <button>Add to Cart</button>
                  </div>
                  <p>
                    Status:
                    <b className={design.stock < 1 ? "redColor" : "greenColor"}>
                      {design.stock > 1 ? "InStock" : "OutOfStock"}
                    </b>
                  </p>
                </div>
      
                <div className="detailsBlock_4">
                  Description: <p>{design.description}</p>
                </div>
      
                <button className="submitReview">Submit Review</button>
              </div>
            </div>
      
            <h3 className="reviewsHeading">REVIEWS</h3>
            {/* if we are having one review of the product */}
            {design.reviews && design.reviews[0] ? 
            (
              <div className="reviews">
                  {design.reviews && design.reviews.map((review)=><ReviewCard review={review}/>)}
              </div>
            ): (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </Fragment>)}
    </Fragment>
  );
};

export default ItemDetails;
