import React, { useContext, useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

import { SearchContext } from "../../contexts/SearchContext";
import { editData, fetchData, postData, removeData, singleData } from "./Classes.handler";

import { faAdd, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Form, Input, Modal, Pagination, Radio } from "antd";
import Meta from "antd/es/card/Meta";

import CardClass from "../../components/CardClass/CardClass.component";
import Loading from "../../components/Loading/Loading.component";

import styles from "./Classes.module.css";
import { ClassContext } from "../../contexts/ClassContext";
import Cookies from "js-cookie";

const Classes = () => {
  const { search, setSearch, loadingAdd, setLoadingAdd, loadingUpdate, setLoadingUpdate, loadingDelete, setLoadingDelete } = useContext(SearchContext);
  const { setDetail } = useContext(ClassContext);
  const [form] = useForm();

  const [classes, setClasses] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [idClass, setIdClass] = useState(0);

  const getData = async () => {
    setDetail(false);
    setLoading(true);
    const res = await fetchData(search, current);
    setClasses(res);
    setLoading(false);
    setTotal((res?.meta?.total / 2) * 10);
  };

  const addData = async () => {
    try {
      setLoadingAdd(true);
      const values = await form.validateFields();
      await postData(values, form, setAddModal);
      getData();
      setLoadingAdd(false);
    } catch (error) {
      setLoadingAdd(false);
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    setLoadingDelete(true);
    await removeData(id);
    setLoadingDelete(false);
    getData();
  };

  const onUpdateData = async (id) => {
    setLoadingUpdate(true);
    try {
      setIdClass(id);
      const res = await singleData(id);

      const { name, description, active } = res;
      await form.setFieldsValue({
        name,
        description,
        active,
      });
    } catch (error) {
      console.log(error);
    }
    setLoadingUpdate(false);
  };

  const updateData = async () => {
    setLoadingUpdate(true);
    const values = await form.validateFields();
    await editData(idClass, values, form, setUpdateModal);
    setLoadingUpdate(false);
    getData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [search, current]);

  const renderAddModal = () => {
    return (
      <Modal
        title="New Class"
        open={addModal}
        onOk={addData}
        confirmLoading={loadingAdd}
        onCancel={() => {
          form.resetFields();
          setAddModal(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, min: 5 }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, min: 10 }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Active" name="active" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={true}>Active</Radio>
              <Radio value={false}>Inactive</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const renderUpdateModal = () => {
    return (
      <Modal
        title="Update Class"
        open={updateModal}
        onOk={updateData}
        confirmLoading={loadingUpdate}
        onCancel={() => {
          form.resetFields();
          setUpdateModal(false);
        }}
      >
        {loadingUpdate ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loading />
          </div>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item label="Name" name="name" rules={[{ required: true, min: 5 }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, min: 10 }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Active" name="active" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value={true}>Active</Radio>
                <Radio value={false}>Inactive</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        )}
      </Modal>
    );
  };

  return (
    <>
      {!search ? (
        ""
      ) : (
        <>
          <div className={styles.filterWrap}>
            <p>Filtered: </p>
            <span className={styles.filter} onClick={() => setSearch("")}>
              {search} <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          </div>
        </>
      )}
      {loading ? (
        <div className={styles.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={styles.cardWrapper}>
            {`${Cookies.get("role")}` !== "student" ? (
              <Card
                hoverable
                cover={<FontAwesomeIcon icon={faAdd} className={styles.iconAdd} />}
                className={styles.card}
                onClick={() => {
                  setAddModal(true);
                }}
              >
                <Meta title="Add Class" style={{ textAlign: "center" }} />
              </Card>
            ) : null}

            {classes?.data?.map((item) => (
              <CardClass key={item.id} item={item} handleDelete={deleteData} confirmLoading={loadingDelete} modalUpdate={setUpdateModal} updateData={onUpdateData} />
            ))}
          </div>

          <div className={styles.paginationWrapper}>
            <Pagination current={current} total={total} onChange={(curr) => setCurrent(curr)} />
          </div>
        </>
      )}

      {renderAddModal()}
      {renderUpdateModal()}
    </>
  );
};

export default Classes;
