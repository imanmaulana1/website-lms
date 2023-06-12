import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Popover } from "antd";
import Cookies from "js-cookie";

import styles from "./Hamburger.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const HamburgerComp = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.hamburgerWrapper}>
      <Popover
        placement="topLeft"
        content={
          <>
            <div>
              <Button onClick={() => navigate("/classes")} style={{ width: "100%", marginTop: "5%" }}>
                Classes
              </Button>
            </div>
            <div>
              <Button onClick={() => navigate("/user")} style={{ width: "100%", marginTop: "5%" }}>
                Users
              </Button>
            </div>
            <div>
              <Button onClick={() => navigate("/question-bank")} style={{ width: "100%", marginTop: "5%" }}>
                Question Banks
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  Cookies.remove("token");
                  Cookies.remove("username");
                  Cookies.remove("role");
                  navigate("/");
                }}
                style={{ width: "100%", backgroundColor: "red", color: "#fff", marginTop: "25%" }}
              >
                Logout
              </Button>
            </div>
          </>
        }
        title="Menus"
        trigger="click"
      >
        <Button className={styles.btn}>
          <FontAwesomeIcon icon={faBars} className={styles.icon} />
        </Button>
      </Popover>
    </div>
  );
};

export default HamburgerComp;
