import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm } from "antd";
import Meta from "antd/es/card/Meta";

import styles from "./CardClass.module.css";
import js from "../../assets/js.svg";
import nodejs from "../../assets/nodejs.svg";
import html from "../../assets/html.svg";
import css from "../../assets/css.svg";
import mongodb from "../../assets/mongodb.svg";
import react from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CardClass = ({ item, handleDelete, confirmLoading, modalUpdate, updateData }) => {
  const navigate = useNavigate();
  const imageCover = [js, nodejs, react, html, css, mongodb];
  const onUpdate = (id) => {
    modalUpdate(true);
    updateData(id);
  };
  return (
    <Card hoverable cover={<img alt="example" src={imageCover[Math.floor(Math.random() * 6)]} className={styles.imgCard} />} className={item.active ? styles.card : styles.cardInActive}>
      <Meta
        title={
          item.active ? (
            <>
              {item.name} <span className={styles.active}>Active</span>
            </>
          ) : (
            <>
              {item.name} <span className={styles.inactive}>Inactive</span>
            </>
          )
        }
        description={
          <>
            <div className={styles.btnWrapper}>
              <Button className={`${styles.btn} ${styles.btnOpen}`} onClick={() => navigate(`/classes/${item.id}/dashboard`)}>
                <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: "12px" }} /> <span style={{ fontSize: "12px" }}>Open</span>
              </Button>
              {Cookies.get("role") !== "student" ? (
                <>
                  <Button className={`${styles.btn} ${styles.btnEdit}`} onClick={() => onUpdate(item.id)}>
                    <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: "12px" }} /> <span style={{ fontSize: "12px" }}>Edit</span>
                  </Button>

                  <Popconfirm
                    icon={<InfoCircleOutlined style={{ color: "red" }} />}
                    title="Are you sure to delete this class?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(item.id)}
                    okButtonProps={{
                      loading: confirmLoading,
                    }}
                  >
                    <Button className={`${styles.btn} ${styles.btnDelete}`}>
                      <FontAwesomeIcon icon={faTrash} style={{ fontSize: "12px" }} /> <span style={{ fontSize: "12px" }}>Delete</span>
                    </Button>
                  </Popconfirm>
                </>
              ) : null}
            </div>
          </>
        }
      />
    </Card>
  );
};

export default CardClass;
