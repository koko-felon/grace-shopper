import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import SideBar from "./SideBar";

function SingleCategory(props) {
  return (
    <>
      <Nav />
      <div>This is the Single Category page!</div>
      <SideBar />
      <Footer />
    </>
  );
}

export default SingleCategory;
