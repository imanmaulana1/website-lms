import React, { useContext } from "react";

import { Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleChevronDown, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./NavbarLinks.module.css";
import { MENU_ADMIN, MENU_LOGOUT, MENU_STUDENT, MENU_TRAINER } from "../../constants";
import { SearchContext } from "../../contexts/SearchContext";
import { ClassContext } from "../../contexts/ClassContext";
import { useNavigate } from "react-router-dom";

const NavbarLinks = ({ username, role, handleClick }) => {
  const { inputSearch, setInputSearch, setSearch } = useContext(SearchContext);
  const { detail } = useContext(ClassContext);
  const navigate = useNavigate()

  const handleSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputSearch);
    setInputSearch("");
  };

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbarMenu}>
        {detail ? (
          <span onClick={()=>navigate(-1)} style={{ backgroundColor: "#efeeee", padding: "5px", marginRight: "20px", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }}>
            <FontAwesomeIcon icon={faCircleArrowLeft} style={{ color: "#2f58cd", paddingRight: "5px", fontSize: "14px" }} />
            Back to dashboard
          </span>
        ) : (
          ""
        )}
        <Dropdown
          menu={{
            items: role === "admin" ? MENU_ADMIN : role === "trainer" ? MENU_TRAINER : MENU_STUDENT,
            onClick: handleClick,
          }}
          trigger={["click"]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <span style={{ backgroundColor: "#efeeee", padding: "5px", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }}>
            <FontAwesomeIcon icon={faCircleChevronDown} style={{ color: "#2f58cd", paddingRight: "5px", fontSize: "14px" }} />
            Menus
          </span>
        </Dropdown>

        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="search" value={inputSearch} placeholder="Search..." className={styles.searchInput} onChange={handleSearch} />
            <button type="submit" className={styles.searchBtn} disabled={!inputSearch}>
              <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            </button>
          </form>
        </div>
      </div>
      <div className={styles.navbarLogout}>
        <Dropdown
          menu={{
            items: MENU_LOGOUT,
            onClick: handleClick,
          }}
          trigger={["click"]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <span style={{ backgroundColor: "#efeeee", padding: "5px", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }}>
            <FontAwesomeIcon icon={faUser} style={{ color: "#2f58cd", paddingRight: "5px", fontSize: "14px" }} />
            {username}
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavbarLinks;
