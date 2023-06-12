import { Button, Divider, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import moment from "moment/moment";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionColumns from "../../components/ActionColumns/ActionColumns.component";
import FormQuestionBanks from "../../components/FormQuestionBanks/FormQuestionBanks.component";
import HeaderContent from "../../components/HeaderContent/HeaderContent.component";
import Loading from "../../components/Loading/Loading.component";
import { QUESTION_COLUMNS } from "../../constants";
import { SearchContext } from "../../contexts/SearchContext";
import { detailData, editData, fetchData, postData, removeData } from "./QuestionBanks.handler";

import styles from "./QuestionBanks.module.css";

const QuestionBanks = () => {
  const { loadingAdd, setLoadingAdd, loadingDetail, setLoadingDetail, loadingUpdate, setLoadingUpdate, setLoadingDelete, setIndex } = useContext(SearchContext);
  const [form] = useForm();
  const navigate = useNavigate();
  const [idQuestion, setIdQuestion] = useState(0);
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState({});
  const [detailModal, setDetailModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataTable, setDataTable] = useState({
    current: 1,
    size: 100,
  });

  const getData = async () => {
    setLoading(true);
    const res = await fetchData(dataTable);
    setDatas(res);
    setLoading(false);
  };

  const onDetail = async (id) => {
    setLoadingDetail(true);
    const res = await detailData(id);
    setData(res);
    setLoadingDetail(false);
  };

  const createData = async () => {
    try {
      setLoadingAdd(true);
      const values = await form.validateFields();
      await postData(values, form, setAddModal);
      setLoadingAdd(false);
      await getData();
    } catch (error) {
      setLoadingAdd(false);
      console.log(error);
    }
  };

  const onUpdateData = async (id) => {
    try {
      setIdQuestion(id);
      const res = await detailData(id);
      const { name, major, class_grade: classGrade } = res;
      await form.setFieldsValue({
        name,
        major,
        classGrade,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    setLoadingUpdate(true);
    const values = await form.getFieldsValue();
    await editData(idQuestion, values, form, setUpdateModal);
    setLoadingUpdate(false);
    await getData();
  };

  const deleteData = async (id) => {
    setLoadingDelete(true);
    await removeData(id);
    setLoadingDelete(false);
    await getData();
  };

  const renderActionColumns = (record) => {
    return <ActionColumns record={record} stateDetailModal={setDetailModal} stateUpdateModal={setUpdateModal} onDetail={onDetail} onUpdateData={onUpdateData} deleteData={deleteData} />;
  };

  const columns = [
    ...QUESTION_COLUMNS,
    {
      title: "Action",
      dataIndex: "id",
      render: (_, record) => <Fragment key={record.id}>{renderActionColumns(record)}</Fragment>,
    },
  ];

  const dataSource = datas?.data?.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });

  const pagination = {
    current: dataTable.current,
    size: dataTable.size,
    total: datas?.meta?.total,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
    onChange: (current, size) => {
      setDataTable({ current, size });
    },
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [dataTable.current]);

  const renderDetailModal = () => {
    return (
      <Modal
        title={`Created by ${data?.user?.name}`}
        open={detailModal}
        onOk={() => {
          setIndex(2);
          navigate(`/question-banks/${data.id}/questions`);
        }}
        onCancel={() => {
          setDetailModal(false);
        }}
        footer={[
          <Button
            onClick={() => {
              setDetailModal(false);
            }}
          >
            Close
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              navigate(`/question-banks/${data.id}/questions`);
            }}
          >
            Open
          </Button>,
        ]}
      >
        {loadingDetail ? (
          <div className={styles.loadingWrapper}>
            <Loading />
          </div>
        ) : (
          <div className={styles.detailWrapper}>
            <div className={styles.headerWrapper}>
              <h4 className={styles.header}>Name</h4>
              <h4 className={styles.header}>Major</h4>
              <h4 className={styles.header}>Class Grade</h4>
              <h4 className={styles.header}>Created at</h4>
              <h4 className={styles.header}>Updated at</h4>
            </div>
            <div className={styles.textWrapper}>
              <p className={styles.text}>{data?.name}</p>
              <p className={styles.text}>{data?.major}</p>
              <p className={styles.text}>{data?.class_grade}</p>
              <p className={styles.text}>{moment(data?.created_at).format("MMM Do YY")}</p>
              <p className={styles.text}>{moment(data?.updated_at).format("MMM Do YY")}</p>
            </div>
          </div>
        )}
      </Modal>
    );
  };
  const renderAddModal = () => {
    return (
      <Modal
        title="Add Question Bank"
        open={addModal}
        onOk={createData}
        onCancel={() => {
          setAddModal(false);
          form.resetFields();
        }}
        confirmLoading={loadingAdd}
      >
        <FormQuestionBanks form={form} />
      </Modal>
    );
  };
  const renderUpdateModal = () => {
    return (
      <Modal
        title="Edit Question Bank"
        open={updateModal}
        onOk={updateData}
        onCancel={() => {
          setUpdateModal(false);
          form.resetFields();
        }}
        confirmLoading={loadingUpdate}
      >
        <FormQuestionBanks form={form} />
      </Modal>
    );
  };

  return (
    <>
      <HeaderContent stateAddModal={setAddModal} text={"Add Question Bank"} />
      <div className={styles.tableWrap}>
        <Divider>Question Banks</Divider>
        <Table dataSource={dataSource} columns={columns} pagination={pagination} loading={loading} size="small" style={{ textAlign: "center" }} />;
      </div>
      {renderDetailModal()}
      {renderAddModal()}
      {renderUpdateModal()}
    </>
  );
};

export default QuestionBanks;
