import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { HomeOutlined, QuestionCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { faAnglesLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./LayoutQuestion.module.css";

import Sidebar from "../../components/Sidebar/Sidebar.component";

const LayoutQuestion = (props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarQuestion = [
    {
      key: "classes",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "question-bank",
      icon: <QuestionCircleOutlined />,
      label: "Question Banks",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      style: { position: "absolute", bottom: "20px" },
    },
  ];

  const handleClick = (value) => {
    if (value === "classes") {
      navigate(`/${value}`);
    } else if (value === "question-bank") {
      navigate(`/${value}`);
    } else if (value === "logout") {
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("role");
      navigate("/");
    }
  };

  return (
    <Layout hasSider>
      <div className="aside">
        <Sidebar collapsed={collapsed} menu={sidebarQuestion} onClick={handleClick} />
      </div>
      <Layout
        className="site-layout"
        style={
          collapsed
            ? {
                marginLeft: 100,
              }
            : {
                marginLeft: 200,
              }
        }
      >
        <Header
          style={{
            padding: "0 20px",
            background: "#fff",
          }}
        >
          {collapsed ? <FontAwesomeIcon icon={faBars} className={styles.icon} onClick={() => setCollapsed(!collapsed)} /> : <FontAwesomeIcon icon={faAnglesLeft} className={styles.icon} onClick={() => setCollapsed(!collapsed)} />}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
          }}
        >
          {props.children}
        </Content>

        <div className="footer">
          <Button style={{ background: "transparent", border: "none", padding: "30px 0", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => navigate("/classes")}>
            <HomeOutlined style={{ fontSize: "23px", color: "#ffffff" }} />
          </Button>
          <Button style={{ background: "transparent", border: "none", padding: "30px 0", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => navigate("/question-bank")}>
            <QuestionCircleOutlined style={{ fontSize: "23px", color: "#ffffff" }} />
          </Button>
          <Button
            style={{ background: "transparent", border: "none", padding: "30px 0", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("username");
              Cookies.remove("role");
              navigate("/");
            }}
          >
            <LogoutOutlined style={{ fontSize: "23px", color: "#ffffff" }} />
          </Button>
        </div>
      </Layout>
    </Layout>
  );
};

export default LayoutQuestion;
