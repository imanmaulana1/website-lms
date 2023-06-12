import { InfoCircleOutlined } from "@ant-design/icons";
import { faCircleInfo, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Popconfirm, Space } from "antd";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import { SearchContext } from "../../contexts/SearchContext";

import styles from "./ActionColumns.module.css";
const ActionColumns = ({ onDetail, stateDetailModal, stateUpdateModal, deleteData, onUpdateData, record }) => {
  const { loadingDelete } = useContext(SearchContext);
  const { setDetail } = useContext(ClassContext);
  return (
    <Space align="center" size={[16]}>
      <Button
        className={`${styles.btn} ${styles.btnDetail}`}
        size="small"
        onClick={() => {
          onDetail(record.id);
          stateDetailModal(true);
          setDetail(true);
        }}
      >
        <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: "12px", marginRight: "5px" }} /> <span style={{ fontSize: "12px" }}>Detail</span>
      </Button>
      {Cookies.get("role") !== "student" ? (
        <>
          <Button
            className={`${styles.btn} ${styles.btnEdit}`}
            size="small"
            onClick={() => {
              onUpdateData(record.id);
              stateUpdateModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: "12px", marginRight: "5px" }} /> <span style={{ fontSize: "12px" }}>Edit</span>
          </Button>

          <Popconfirm
            icon={<InfoCircleOutlined style={{ color: "red" }} />}
            title="Are you sure you want to delete?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteData(record.id)}
            okButtonProps={{
              loading: loadingDelete,
            }}
          >
            <Button className={`${styles.btn} ${styles.btnDelete}`} size="small">
              <FontAwesomeIcon icon={faTrash} style={{ fontSize: "12px", marginRight: "5px" }} /> <span style={{ fontSize: "12px" }}>Delete</span>
            </Button>
          </Popconfirm>
        </>
      ) : null}
    </Space>
  );
};

export default ActionColumns;
