import Sider from "antd/es/layout/Sider";
import React from "react";

import styles from "./Sidebar.module.css";
import logo from "../../assets/logo.svg";
import { Menu } from "antd";

const Sidebar = ({ collapsed, menu, onClick }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsedWidth="100"
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className={styles.logo}>
        <img src={logo} alt="logo" className={styles.logoLayout} />
        {collapsed ? (
          ""
        ) : (
          <h1 className={styles.textHeader}>
            Dev<span style={{ color: "#2F58CD" }}>Edu</span>
          </h1>
        )}
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]} items={menu} style={{ marginTop: "35px" }} onClick={(value) => onClick(value.key)} />
    </Sider>
  );
};

export default Sidebar;
