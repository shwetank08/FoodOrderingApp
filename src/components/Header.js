import React from "react";
import { Link } from "react-router-dom";


const Header = () => {

  return (
    <div>
      <div>
        <div><Link to="/">Navbar</Link></div>
        <div className="me-auto">
          <div><Link to="/">Home</Link></div>
          <div><Link to="/about">About</Link></div>
          <div><Link to="/contact">Contact</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
