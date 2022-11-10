import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./List.css";

const Header = (props) => {
  
  return (
    <nav className="navbar  ">
      <div className="container-fluid ">
        <Link className=" navbar-brand text-danger " to="/">
          Kitaplığım
        </Link>

      </div>
    </nav>
  );
};

export default Header;
