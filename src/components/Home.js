import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import SideBar from "./SideBar";

function Home(props) {
  return (
    <>
      <Nav />
      <div>This is the Home Page!</div>;
      <SideBar />
      <Footer />
    </>
  );
}

export default Home;
