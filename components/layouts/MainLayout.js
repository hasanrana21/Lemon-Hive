import React from "react";
import Navbar from "../common/navbar/Navbar";

const MainLayout = (props) => {
  return (
    <>
      <Navbar></Navbar>
      <div>{props.children}</div>
    </>
  );
};

export default MainLayout;
