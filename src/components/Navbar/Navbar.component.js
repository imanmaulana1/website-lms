import React from "react";
import Cookies from "js-cookie";

import NavbarBrand from "../NavbarBrand/NavbarBrand.component";
import NavbarLinks from "../NavbarLinks/NavbarLinks.component";

import styles from "./Navbar.module.css";

const Navbar = ({ handleClick }) => {
  const role = Cookies.get("role");
  const username = Cookies.get("username");

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLinks}>
        <NavbarBrand />
        <NavbarLinks username={username} role={role} handleClick={(value) => handleClick(value)} />
      </div>
    </nav>
  );
};

export default Navbar;
