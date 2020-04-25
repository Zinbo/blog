import React from "react";
import { Link } from "gatsby";
import styles from "./Header.module.scss";

const Header = () => (
  <div className={styles.navbar}>
    <div className={styles.navitems}>
      <Link to="/">Stack to Basics</Link>
    </div>
    <div className={styles.navitems}>
      <Link to="/about">About</Link>
    </div>
  </div>
);

export default Header;
