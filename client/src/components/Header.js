import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secandary pointing menu">
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className=" right menu"></div>
      <Link to="/" className="item">
        All Streams
      </Link>
      <GoogleAuth />
    </div>
  );
};

export default Header;
