import React from "react";
import { Link } from "react-router-dom";
import "./List.css";


const Header = (props) => {
  return (
    <nav className="navbar  ">
      <div className="container-fluid ">
        <Link className=" navbar-brand text-danger " to="/">
          Kitaplığım
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
       
      </div>
    </nav>
  );
};

export default Header;
