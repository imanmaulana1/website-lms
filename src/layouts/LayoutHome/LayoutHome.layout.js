import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ClassContext } from "../../contexts/ClassContext";

import Layout, { Content, Footer } from "antd/es/layout/layout";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import Navbar from "../../components/Navbar/Navbar.component";
import HamburgerComp from "../../components/Hamburger/Hamburger.component";

import styles from "./LayoutHome.module.css";

const LayoutHome = (props) => {
  const { detail } = useContext(ClassContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const handleClick = (value) => {
    if (value.key === "logout") {
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("role");
      navigate("/");
    } else if (value.key === "classes") {
      setActive(1);
      navigate(`/${value.key}`);
    } else if (value.key === "user") {
      setActive(2);
      navigate(`/${value.key}`);
    } else if (value.key === "question-bank") {
      setActive(3);
      navigate(`/${value.key}`);
    }
  };

  return (
    <Layout className={styles.layout}>
      <Navbar handleClick={handleClick} />
      <Content
        style={{
          padding: "0 50px",
          backgroundColor: "#fff",
        }}
      >
        <Breadcrumb
          style={{
            marginTop: "20px",
            marginBottom: "10px",
          }}
          items={[
            {
              title: <HomeOutlined />,
            },
            {
              title:
                active === 1 ? (
                  <>
                    <span>Classes</span>
                  </>
                ) : active === 2 ? (
                  <>
                    <span>Users</span>
                  </>
                ) : (
                  <>
                    <span>Question Banks</span>
                  </>
                ),
            },
            detail
              ? {
                  title: "Material",
                }
              : "",
          ]}
        />

        <HamburgerComp />

        <div
          className="site-layout-content"
          style={{
            padding: "20px 0",
            borderRadius: "10px",
          }}
        >
          {props.children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          color: "#000",
          position: "fixed",
          bottom: "0",
          width: "100%",
          backgroundColor: "#dadada",
        }}
      >
        Ant Design ©2023 Iman Maulana
      </Footer>
    </Layout>
  );
};

export default LayoutHome;
