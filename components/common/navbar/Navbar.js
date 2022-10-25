import React from "react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/">
        <h2 className="text-4xl font-bold cursor-pointer">
          Rea<span className="text-primary-1">c</span>t
        </h2>
      </Link>
      <div>
        <ul className={styles.navbar}>
          <li>About us</li>
          <li>What We do</li>
          <li>Our work</li>
          <li>Blog</li>
          <li>Say hi</li>
        </ul>
      </div>
      <div>
        <span className="mdi mdi-menu cursor-pointer text-3xl"></span>
      </div>
    </div>
  );
};

export default Navbar;
