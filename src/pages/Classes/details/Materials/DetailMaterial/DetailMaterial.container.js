import { Descriptions, Skeleton } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchDetailMaterial } from "./DetailMaterial.handler";

import styles from "./DetailMaterial.module.css";

const DetailMaterial = () => {
  const { idMaterial } = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetchDetailMaterial(idMaterial);
    setData(res.data);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  console.log(Boolean(data));
  return (
    <>
      {data ? (
        <div className={styles.contentWrapper}>
          <Descriptions title={data?.name}>
            <Descriptions.Item label="Trainer" span={2}>
              {<p>{data?.owner?.name}</p>}
            </Descriptions.Item>
            <Descriptions.Item label="Created">{moment(data?.created_at).format("LLLL")}</Descriptions.Item>
            <Descriptions.Item label="Status" span={2}>
              {<span className={`${styles.status}`}>{data?.status}</span>}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">{moment(data?.updated_at).format("LLLL")}</Descriptions.Item>
            <Descriptions.Item label="Label" span={2}>
              {<span className={`${styles.status}`}>{data?.label}</span>}
            </Descriptions.Item>
          </Descriptions>
          <p>{data?.description}</p>
        </div>
      ) : (
        <div className={styles.loadingWrapper}>
          <Skeleton active />
        </div>
      )}
    </>
  );
};

export default DetailMaterial;
