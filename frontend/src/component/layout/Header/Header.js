import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";

const options = {
  burgerColorHover: "#eb4034",

  logo,

  logoWidth: "2vmax",

  navColor1: "white",

  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",

  link1Text: "Home",
  link2Text: "Product",
  link3Text: "Contact",
  link4Text: "About",
  link5Text: "Search",

  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link5Url: "/search",

  link1Size: "1.3vmax",
  link1Color: "rgba(35,35,35,0.8)",

  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",

  link1ColorHover: "#eb4034",

  link2Margin: "1vmax",
  link3Margin: "0",
  link4Margin: "1vmax",

  profileIconColor: "rgba(35,35,35)",
  searchIconColor: "rgba(35,35,35)",
  cartIconColor: "rgba(35,35,35)",

  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHoverx: "#eb4034",

  cartIconMargin: "1vmax",
};

const Header = () => {
  return (
    <div className="navbarIcons">
      <ReactNavbar {...options} />
      <Link className="link" to="/search">
        <i class="bi bi-search-heart"></i>
      </Link>
      <Link className="link" to="/login">
        <i class="bi bi-person"></i>
      </Link>
    </div>
  );
};

export default Header;
