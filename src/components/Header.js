import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./List.css";
import Search from "./Search";





const Header = (props) => {
  
  return (
    <nav className="navbar  ">
  
      <div className="container-fluid ">
        <Link className=" navbar-brand text-danger " to="/">
          Kitaplığım
        </Link>
        
        <Search />
    



      
      </div>
    </nav>
  );
};

export default Header;
