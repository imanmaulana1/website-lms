import React, { Fragment, useContext, useEffect, useState } from "react";

import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Modal, Table } from "antd";

import { OPTION_ADD_USER, USER_COLUMNS } from "../../constants";
import { SearchContext } from "../../contexts/SearchContext";
import { detailData, editData, fetchData, postData, removeData } from "./Users.handler";

import styles from "./Users.module.css";
import user from "../../assets/user.svg";
import Loading from "../../components/Loading/Loading.component";
import { useForm } from "antd/es/form/Form";
import FormUser from "../../components/FormUser/FormUser.component";
import HeaderContent from "../../components/HeaderContent/HeaderContent.component";
import Cookies from "js-cookie";
import ActionColumns from "../../components/ActionColumns/ActionColumns.component";

const Users = () => {
  const { search, loadingAdd, setLoadingAdd, loadingUpdate, setLoadingUpdate, setLoadingDelete, loadingDetail, setLoadingDetail } = useContext(SearchContext);
  const [form] = useForm();
  const [idUser, setIdUser] = useState(0);
  const [users, setUsers] = useState([]);
  const [detailUser, setDetailUser] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [dataTable, setDataTable] = useState({
    current: 1,
    size: 100,
  });
  const role = Cookies.get("role");

  // CRUD USER
  const getData = async () => {
    setLoadingTable(true);
    const response = await fetchData(search, dataTable);
    setUsers(response);
    setLoadingTable(false);
  };

  const onDetail = async (id) => {
    setLoadingDetail(true);
    const response = await detailData(id);
    setDetailUser(response);
    setLoadingDetail(false);
  };

  const submitData = async () => {
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
    getData();
    setLoadingDelete(false);
  };

  const onUpdateData = async (id) => {
    try {
      setIdUser(id);
      const res = await detailData(id);
      const { ktp, name, email, phone, role, is_verified } = res;

      await form.setFieldsValue({
        ktp,
        name,
        email,
        phone,
        role,
        is_verified,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    setLoadingUpdate(true);
    const values = form.getFieldsValue();

    await editData(idUser, values, form, setUpdateModal);
    setLoadingUpdate(false);
    getData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [search, dataTable.current, dataTable.size]);

  const columns = [
    ...USER_COLUMNS,
    {
      title: "Action",
      dataIndex: "id",
      render: (_, record) => <Fragment key={record.id}>{renderActionColumns(record)}</Fragment>,
    },
  ];

  const actions = columns.filter((col) => col.dataIndex !== "id");

  const dataSource = users?.data?.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });

  const pagination = {
    current: dataTable.current,
    size: dataTable.size,
    total: users?.meta?.total,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
    onChange: (current, size) => {
      setDataTable({ current, size });
    },
  };

  const renderActionColumns = (record) => {
    return <ActionColumns record={record} stateDetailModal={setDetailModal} stateUpdateModal={setUpdateModal} onDetail={onDetail} onUpdateData={onUpdateData} deleteData={deleteData} />;
  };

  const renderDetailModal = () => {
    return (
      <Modal
        title="Detail User"
        open={detailModal}
        onOk={() => {
          setDetailModal(false);
        }}
        onCancel={() => {
          setDetailModal(false);
        }}
        width="650px"
        footer={[
          <Button
            type="primary"
            danger
            onClick={() => {
              setDetailModal(false);
            }}
          >
            Close
          </Button>,
        ]}
      >
        <div className={styles.detailWrapper}>
          {loadingDetail ? (
            <div className={styles.loadingWrapper}>
              <Loading />
            </div>
          ) : (
            <>
              <img src={user} alt="user" className={styles.profile} />
              <div className={styles.profileWrapper}>
                {detailUser.is_verified ? <h3 className={styles.verified__true}>Verified</h3> : <h3 className={styles.verified__false}>Not Verified</h3>}
                <div className={styles.profileData}>
                  <p>No. KTP</p>
                  <p>:</p>
                  <p>{detailUser?.ktp}</p>
                </div>
                <div className={styles.profileData}>
                  <p>Name</p>
                  <p>:</p>
                  <p>{detailUser?.name}</p>
                </div>
                <div className={styles.profileData}>
                  <p>Email</p>
                  <p>:</p>
                  <p>{detailUser?.email}</p>
                </div>
                <div className={styles.profileData}>
                  <p>Phone</p>
                  <p>:</p>
                  <p>{detailUser?.phone}</p>
                </div>
                <div className={styles.profileData}>
                  <p>Role</p>
                  <p>:</p>
                  <p>{detailUser.role}</p>
                </div>
                <div className={styles.profileData}>
                  <p>Member of Class</p>
                  <p>:</p>
                  <div className={styles.list}>
                    <ul>
                      {detailUser.memberOf &&
                        detailUser.memberOf.map((item, idx) => (
                          <Fragment key={idx}>
                            <li style={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
                              <FontAwesomeIcon icon={faCircle} style={{ fontSize: "6px", color: "#2f58cd" }} />
                              {item.name}
                            </li>
                          </Fragment>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    );
  };
  const renderAddModal = () => {
    return (
      <Modal
        title="Add User"
        open={addModal}
        onOk={submitData}
        onCancel={() => {
          setAddModal(false);
          form.resetFields();
        }}
        confirmLoading={loadingAdd}
      >
        <FormUser form={form} disabledEmail={false} disabledPassword={false} options={OPTION_ADD_USER} />
      </Modal>
    );
  };
  const renderUpdateModal = () => {
    return (
      <Modal
        title="Update User"
        open={updateModal}
        onOk={updateData}
        onCancel={() => {
          setUpdateModal(false);
          form.resetFields();
        }}
        confirmLoading={loadingUpdate}
      >
        <FormUser form={form} disabledEmail={true} disabledPassword={true} options={OPTION_ADD_USER} />
      </Modal>
    );
  };

  return (
    <>
      <HeaderContent stateAddModal={setAddModal} />
      <div className={styles.tableWrap}>
        <Divider>Data User</Divider>
        <Table dataSource={dataSource} columns={role === "admin" ? columns : actions} pagination={pagination} loading={loadingTable} size="small" style={{ textAlign: "center" }} />;
      </div>
      {renderDetailModal()}
      {addModal ? renderAddModal() : ""}
      {updateModal ? renderUpdateModal() : ""}
    </>
  );
};

export default Users;
