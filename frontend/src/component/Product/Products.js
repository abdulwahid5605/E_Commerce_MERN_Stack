import React, { Fragment, useEffect } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import {  getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/Product";
// for page control
import Pagination from "react-js-pagination";
import { useState } from "react";

// slider
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

// catagories
const catagories=[
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
]

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;

  // inside useState we are defining the initial position
  const [currentPage, setCurrentPage] = useState(1);
  const [catagory, setCatagory] = useState("");
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);


  const { products,
     loading,
     productsCount,
     resultPerPage,
      } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    console.log({ keyword, currentPage, price });
    dispatch(getProduct(keyword, currentPage, price,catagory,ratings));
  }, [dispatch, keyword, currentPage, price,catagory,ratings]);

  // let count=filteredDesignsCount
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE"/>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                // we will render product card that is already been created
                // we are taking this product from "Product" file
                <Product key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price} //we will use "useState" to define it
              onChange={priceHandler}
              valueLabelDisplay="auto" //auto can be replaced by on
              aria-labelledby="range-slider" // it is a type of slider
              min={0}
              max={25000}
            />

            <Typography>Catagories</Typography>
            <ul className="catagoryBox">
              {catagories.map((catagory)=>(
                <li
                className="catagory-link"
                key={catagory} // ye backend se aa rahi ha
                onClick={()=>setCatagory(catagory)}
                > 
                  {catagory}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography className="ratings-heading" component="legend">Ratings Above</Typography>
              <Slider
              value={ratings}
              onChange={(e,newRating)=>{
                setRatings(newRating)
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
              />
            </fieldset>
          </div>

          {/* for page control */}
          <div className="paginationBox">
            {/* these all are the built in modules that we have used in pagination
            there is a default class of Pagination(which a actually a ul tag) pagination */}
            {resultPerPage < productsCount && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Products;
