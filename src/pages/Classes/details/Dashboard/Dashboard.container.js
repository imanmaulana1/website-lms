import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import { ClassContext } from "../../../../contexts/ClassContext";
import { Descriptions, Skeleton } from "antd";
import { fetchData } from "./Dashboard.handler";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { dataClass, setDataClass } = useContext(ClassContext);
  const { idClass } = useParams();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await fetchData(idClass, setLoading);
    setDataClass(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <div className={styles.loadingWrapper}>
          <Skeleton active />
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          <Descriptions title="Class Info">
            <Descriptions.Item label="Class Name" span={2}>
              {dataClass.name}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{dataClass.active ? <span className={`${styles.status} ${styles.active}`}>Active</span> : <span className={`${styles.status} ${styles.inactive}`}>Inactive</span>}</Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {dataClass.description}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">{moment(dataClass.updated_at).format("LLLL")}</Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </>
  );
};

export default Dashboard;
