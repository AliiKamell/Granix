import React from "react";
import "./Footer.css";

import { GiMountaintop } from "react-icons/gi";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer-head">
          <h2>
            Granix
            <GiMountaintop className="logo" />
          </h2>
        </div>
        <div className="footer-main">
          <div className="footer-main-sec1">
            <Link to='/' className="footer-link">About Us</Link>
            <Link to='/' className="footer-link">Store Location</Link>
            <Link to='/' className="footer-link">Declivery</Link>
            <Link to='/' className="footer-link">Cancelation return policy</Link>
            <Link to='/' className="footer-link">Contact Us</Link>
            <Link to='/' className="footer-link">Terms and Conditions</Link>
          </div>
          <div className="footer-main-sec2">
            <Link to='/' className="footer-link">FAQs</Link>
            <Link to='/' className="footer-link">Reviews</Link>
            <Link to='/' className="footer-link">Privecy Policy</Link>
            <Link to='/' className="footer-link">Email Us</Link>
          </div>
        </div>
        <div className="socials">
          <Link to="http://instagram.com" className="social">
            <FaInstagram />
          </Link>
          <Link to="http://facebook.com" className="social">
            <FaFacebookF />
          </Link>
          <Link to="http://tiktok.com" className="social">
            <FaTiktok />
          </Link>
        </div>
        <hr className="hr"/>
        <h5 className="base-footer">© 2024 Granix All rights reserved</h5>
      </div>
    </div>
  );
}

export default Footer;
