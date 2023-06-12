import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { ClassContext } from "../../contexts/ClassContext";

import { HomeOutlined, AppstoreOutlined, CopyOutlined, FileDoneOutlined, LogoutOutlined, LoadingOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { faAnglesLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Spin } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import Sidebar from "../../components/Sidebar/Sidebar.component";

import styles from "./LayoutDashboard.module.css";

const LayoutDashboard = (props) => {
  const { dataClass } = useContext(ClassContext);
  const { idClass } = useParams();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const antIconLoading = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#fff",
      }}
      spin
    />
  );

  const sidebarClasses = [
    {
      key: "classes",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "dashboard",
      icon: <AppstoreOutlined />,
      label:
        dataClass.length >= 1 ? (
          <div className={styles.loadingWrapper}>
            <Spin indicator={antIconLoading} />
          </div>
        ) : (
          dataClass.name
        ),
    },
    {
      key: "material",
      icon: <CopyOutlined />,
      label: "Materials",
    },
    {
      key: "member",
      icon: <UsergroupAddOutlined />,
      label: "Members",
    },
    {
      key: "certificate",
      icon: <FileDoneOutlined />,
      label: "Certificate",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
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
    } else if (value === "dashboard") {
      navigate(`/classes/${idClass}/${value}`);
    } else if (value === "member") {
      navigate(`/classes/${idClass}/${value}`);
    } else if (value === "material") {
      navigate(`/classes/${idClass}/${value}`);
    } else if (value === "certificate") {
      navigate(`/classes/${idClass}/${value}`);
    } else if (value === "profile") {
      navigate(`/classes/${idClass}/${value}`);
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
        <Sidebar collapsed={collapsed} menu={sidebarClasses} onClick={handleClick} />
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
            borderRadius: 12,
          }}
        >
          {props.children}
        </Content>

        <div className="footer"></div>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;
