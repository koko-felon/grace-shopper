import React from "react";
import {
  FaTiktok,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

function Footer(props) {
  return (
    <div className="footer">
      <h6>About Us </h6>
      <h6> Customer Care </h6>
      <h6>Return Policy</h6>
      <div className="socialLogos">
        <a href="https://www.instagram.com/cocofelon7/" target="_blank">
          <FaInstagram size="30px" />
        </a>
        <a href="https://facebook.com" target="_blank">
          <FaFacebookF size="25px" />
        </a>
        <a href="https://twitter.com" target="_blank">
          <FaTwitter size="25px" />
        </a>
        <a href="https://pinterest.com" target="_blank">
          <FaPinterest size="25px" />
        </a>
        <a href="https://tiktok.com" target="_blank">
          <FaTiktok size="25px" />
        </a>
        <a href="https://youtube.com" target="_blank">
          <FaYoutube size="25px" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
