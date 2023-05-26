import React from 'react'
import playstore from "../../../images/playstore.png"
import appstore from "../../../images/appstore.png"
import "./Footer.scss"


const Footers = () => {
  return (
    <footer id="footer">
        
        <div className="leftfooter">
        <h1>DOWNLOAD OUR APP</h1>
        <p>Download our app for Andriod and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="appstore" />
        </div>

        <div className="midfooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2023 &copy; Abdul Wahid</p>
        </div>

        <div className="rightfooter">
            <h4>Follow Us</h4>
            <a href="">Instagram</a>
            <a href="">Youtube</a>
            <a href="">Facebook</a>

        </div>
    </footer>
  )
}

export default Footers
