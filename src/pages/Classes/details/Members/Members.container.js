import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../../../contexts/SearchContext";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import Search from "antd/es/input/Search";

import Loading from "../../../../components/Loading/Loading.component";
import ActionColumns from "../../../../components/ActionColumns/ActionColumns.component";

import { editMember, fetchMember, fetchSingleMember, fetchUser, postMember, removeMember } from "./Members.handler";
import { MEMBER_COLUMNS } from "../../../../constants";
import styles from "./Members.module.css";
import userLogo from "../../../../assets/user.svg";
import Cookies from "js-cookie";

const Members = () => {
  const { loadingAdd, setLoadingAdd, setLoadingDelete, loadingDetail, setLoadingDetail, loadingUpdate, setLoadingUpdate } = useContext(SearchContext);
  const { idClass } = useParams();
  const [form] = useForm();
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [detailMember, setDetailMember] = useState({});
  const [idMember, setIdMember] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [dataTable, setDataTable] = useState({
    current: 1,
    size: 100,
  });
  const [addModal, setAddModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // GET USERS
  const getUsers = async () => {
    const res = await fetchUser();
    setUsers(res.data);
  };

  // CRUD MEMBERS
  const getMembers = async () => {
    setLoadingTable(true);
    const res = await fetchMember(idClass, dataTable, search);
    setMembers(res);
    setLoadingTable(false);
  };

  const onDetail = async (id) => {
    setLoadingDetail(true);
    const response = await fetchSingleMember(id);
    setDetailMember(response);
    setLoadingDetail(false);
  };

  const createMembers = async () => {
    setLoadingAdd(true);
    try {
      const values = await form.validateFields();
      await postMember(idClass, values);
      form.resetFields();
      setAddModal(false);
      await getMembers();
    } catch (error) {
      setLoadingAdd(false);
      console.log(error);
    }
    setLoadingAdd(false);
  };

  const onUpdateMembers = async (id) => {
    try {
      setIdMember(id);
      const res = await fetchSingleMember(id);
      form.setFieldsValue({
        userId: res[0].user_id,
        role: res[0].role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateMembers = async () => {
    setLoadingUpdate(true);
    const values = form.getFieldsValue();

    await editMember(idMember, values, form, setUpdateModal);
    setLoadingUpdate(false);
    getMembers();
  };

  const deleteMembers = async (id) => {
    setLoadingDelete(true);
    await removeMember(id);
    getMembers();
    setLoadingDelete(false);
  };

  useEffect(() => {
    getMembers(search);
    getUsers();
    // eslint-disable-next-line
  }, [search]);

  const columns = [
    ...MEMBER_COLUMNS,
    {
      title: "Action",
      dataIndex: "id",
      render: (_, record) => <Fragment key={record.id}>{renderActionColumns(record)}</Fragment>,
    },
  ];

  const dataSource = members.data?.data?.map((item, idx) => {
    return {
      ...item,
      key: item.id,
      name: item.user.name,
      idx: idx + 1,
    };
  });

  const pagination = {
    current: dataTable.current,
    size: dataTable.size,
    total: members?.data?.meta?.total,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
    onChange: (current, size) => {
      setDataTable({ current, size });
    },
  };

  // OPTION VALUE USERS
  const user = users?.map((data) => ({
    value: data.id,
    label: `${data.name} - ${data.email}`,
  }));

  const onSearch = (value) => {
    setSearch(value);
  };

  const renderActionColumns = (record) => {
    return <ActionColumns record={record} stateDetailModal={setDetailModal} onDetail={onDetail} stateUpdateModal={setUpdateModal} onUpdateData={onUpdateMembers} deleteData={deleteMembers} />;
  };

  const renderAddModal = () => {
    return (
      <Modal
        title="Invite Members"
        open={addModal}
        onOk={createMembers}
        confirmLoading={loadingAdd}
        onCancel={() => {
          form.resetFields();
          setAddModal(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="User" name="userId" rules={[{ required: true }]}>
            <Select options={user} />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select
              options={[
                {
                  value: "student",
                  label: "Student",
                },
                {
                  value: "trainer",
                  label: "Trainer",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const renderEditModal = () => {
    return (
      <Modal
        title="Update Member"
        open={updateModal}
        onOk={updateMembers}
        confirmLoading={loadingUpdate}
        onCancel={() => {
          form.resetFields();
          setUpdateModal(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="User" name="userId">
            <Select options={user} disabled />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select
              options={[
                {
                  value: "student",
                  label: "Student",
                },
                {
                  value: "trainer",
                  label: "Trainer",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const renderDetailModal = () => {
    return (
      <>
        {detailMember.length > 0
          ? detailMember.map((item) => (
              <Modal
                title={item.class.name}
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
                      <img src={userLogo} alt="user" className={styles.profile} />
                      <div className={styles.profileWrapper}>
                        {item.user.is_verified ? <h3 className={styles.verified__true}>Verified</h3> : <h3 className={styles.verified__false}>Not Verified</h3>}
                        <div className={styles.profileData}>
                          <p>Name</p>
                          <p>:</p>
                          <p>{item.user?.name}</p>
                        </div>
                        <div className={styles.profileData}>
                          <p>Email</p>
                          <p>:</p>
                          <p>{item.user?.email}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Modal>
            ))
          : null}
      </>
    );
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <h3 className={styles.textHeader}>Members</h3>
        {Cookies.get("role") !== "student" ? (
          <Button type="primary" className={`${styles.btn}`} onClick={() => setAddModal(true)}>
            <FontAwesomeIcon icon={faPlus} style={{ fontSize: "12px", marginRight: "5px" }} /> <span style={{ fontSize: "12px" }}>Invite Member</span>
          </Button>
        ) : null}
      </div>
      <Form layout="vertical">
        <div className={styles.inputWrapper}>
          <Form.Item name="name">
            <Search
              placeholder="Search user..."
              allowClear
              onSearch={onSearch}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </div>
      </Form>
      <Table columns={columns} pagination={pagination} dataSource={dataSource} loading={loadingTable} size="small" />
      {renderAddModal()}
      {renderDetailModal()}
      {renderEditModal()}
    </>
  );
};

export default Members;
