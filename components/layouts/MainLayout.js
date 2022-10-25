import React from "react";
import Navbar from "../common/navbar/Navbar";
import styles from "../../styles/Home.module.css";

const MainLayout = (props) => {
  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <div>{props.children}</div>
    </div>
  );
};

export default MainLayout;
