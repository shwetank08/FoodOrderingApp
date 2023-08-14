import React from "react";
import { Link } from "react-router-dom";


const Header = () => {

  return (
    <div className="max-w-full bg-{#fefefe} flex justify-around shadow-xl mb-2">
      <div className="max-w-full p-2">
      <Link className="text-black max-w-full font-semibold" to="/">Navbar</Link>
      </div>
        <ul className="flex justify-around gap-8 p-2">
          <li><Link className="text-black font-semibold" to="/">Home</Link></li>
          <li><Link className="text-black font-semibold" to="/about">About</Link></li>
          <li><Link className="text-black font-semibold" to="/contact">Contact</Link></li>
        </ul>
    </div>
  );
};

export default Header;
