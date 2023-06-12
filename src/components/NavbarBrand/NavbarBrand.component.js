import React from "react";

import styles from "./NavbarBrand.module.css"
import logo from "../../assets/logo.svg";

const NavbarBrand = () => {
  return (
    <div className={styles.navbarLogo}>
      <img src={logo} alt="logo" className={styles.logo} />
      <h1>
        Dev<span style={{ color: "#2F58CD" }}>Edu</span>
      </h1>
    </div>
  );
};

export default NavbarBrand;
