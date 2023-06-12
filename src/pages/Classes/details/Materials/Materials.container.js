import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { SearchContext } from "../../../../contexts/SearchContext";

import { detailData, editData, fetchData, fetchUser, postData, removeData } from "./Materials.handler";
import { MATERIAL_COLUMNS } from "../../../../constants";

import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import FormSearchFilter from "../../../../components/FormSearchFilter/FormSearchFilter.container";
import ActionColumns from "../../../../components/ActionColumns/ActionColumns.component";

import styles from "./Materials.module.css";
import Cookies from "js-cookie";

const Materials = () => {
  const { loadingAdd, setLoadingAdd, setLoadingDelete, loadingUpdate, setLoadingUpdate } = useContext(SearchContext);

  const { idClass } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const [loadingTable, setLoadingTable] = useState(false);
  const [label, setLabel] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [dataTable, setDataTable] = useState({
    current: 1,
    size: 100,
  });
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);

  // GET USER ROLE TRAINER
  const getTrainer = async () => {
    const res = await fetchUser();
    setUsers(res.data);
  };

  // CRUD MATERIAL
  const getData = async () => {
    setLoadingTable(true);
    const res = await fetchData(idClass, filter, label, ownerId, dataTable);
    setData(res);
    setLoadingTable(false);
  };

  const createData = async () => {
    setLoadingAdd(true);
    try {
      const values = await form.validateFields();
      await postData(values, idClass, isSchedule);
      await getData();
      form.resetFields();
      setAddModal(false);
    } catch (error) {
      console.log(error);
    }
    setLoadingAdd(false);
  };

  const onUpdateData = async (id) => {
    setMaterialId(id);
    try {
      const res = await detailData(id);
      await form.setFieldsValue({
        name: res.name,
        description: res.description,
        status: res.status,
        label: res.label,
        owner: res.owner_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    setLoadingUpdate(true);
    try {
      const values = await form.validateFields();
      await editData(values, materialId, isSchedule);
      await getData();
      form.resetFields();
      setUpdateModal(false);
    } catch (error) {
      setLoadingUpdate(false);
      console.log(error);
    }

    setLoadingUpdate(false);
  };

  const deleteData = async (id) => {
    setLoadingDelete(true);
    await removeData(id);
    getData();
    setLoadingDelete(false);
  };

  useEffect(() => {
    getData();
    getTrainer();
    // eslint-disable-next-line
  }, [filter, label, ownerId, dataTable.current, dataTable.size]);

  const labels =
    data?.labels?.length > 0
      ? data?.labels?.map((item) => ({
          value: item.label,
          label: `${item.label} (${item.count})`,
        }))
      : "";

  const trainers = users?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const owners =
    data?.owners?.length > 0
      ? data?.owners?.map((item) => ({
          value: item.owner_id,
          label: item.name,
        }))
      : "";

  const columns = [
    ...MATERIAL_COLUMNS,
    {
      title: "Action",
      dataIndex: "id",
      render: (_, record) => <Fragment key={record.id}>{renderActionColumns(record)}</Fragment>,
    },
  ];

  const dataSource = data.data?.data?.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });

  const pagination = {
    current: dataTable.current,
    size: dataTable.size,
    total: data?.data?.meta?.total,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
    onChange: (current, size) => {
      setDataTable({ current, size });
    },
  };

  const handleChangeLabel = (value) => {
    setLabel(value);
  };

  const handleChangeOwner = (value) => {
    setOwnerId(value);
  };

  const onSearch = (value) => {
    setFilter(value);
  };

  const onDetail = (id) => {
    console.log(detailModal);
    navigate(`${id}`);
  };

  const renderActionColumns = (record) => {
    return <ActionColumns record={record} deleteData={deleteData} onUpdateData={onUpdateData} stateUpdateModal={setUpdateModal} onDetail={onDetail} stateDetailModal={setDetailModal} />;
  };

  const renderAddModal = () => {
    return (
      <Modal
        title="New Material"
        open={addModal}
        onOk={createData}
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
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select
              options={[
                {
                  value: "published",
                  label: "Published",
                },
                {
                  value: "scheduled",
                  label: "Scheduled",
                },
                {
                  value: "draft",
                  label: "Draft",
                },
              ]}
              onChange={(e) => {
                if (e === "scheduled") setIsSchedule(true);
                else setIsSchedule(false);
              }}
            />
          </Form.Item>
          <Form.Item label="Schedule" name="schedule" rules={[{ required: isSchedule }]} hidden={!isSchedule}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item label="Label" name="label" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Owner" name="ownerId" rules={[{ required: true }]}>
            <Select options={trainers} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const renderUpdateModal = () => {
    return (
      <Modal
        title="Update Material"
        open={updateModal}
        onOk={updateData}
        confirmLoading={loadingUpdate}
        onCancel={() => {
          form.resetFields();
          setUpdateModal(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, min: 5 }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, min: 10 }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select
              options={[
                {
                  value: "published",
                  label: "Published",
                },
                {
                  value: "scheduled",
                  label: "Scheduled",
                },
                {
                  value: "draft",
                  label: "Draft",
                },
              ]}
              onChange={(e) => {
                if (e === "scheduled") setIsSchedule(true);
                else setIsSchedule(false);
              }}
            />
          </Form.Item>
          <Form.Item label="Schedule" name="schedule" rules={[{ required: isSchedule }]} hidden={!isSchedule}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item label="Label" name="label" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Owner" name="ownerId" rules={[{ required: true }]}>
            <Select options={trainers} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <h3 className={styles.textHeader}>Materials</h3>
        {Cookies.get("role") !== "student" ? (
          <Button type="primary" className={`${styles.btn}`} onClick={() => setAddModal(true)}>
            <FontAwesomeIcon icon={faPlus} style={{ fontSize: "12px", marginRight: "5px" }} /> <span style={{ fontSize: "12px" }}>Add</span>
          </Button>
        ) : null}
      </div>

      <FormSearchFilter owners={owners} labels={labels} handleChangeLabel={handleChangeLabel} handleChangeOwner={handleChangeOwner} onSearch={onSearch} />
      <Table
        columns={columns}
        pagination={pagination}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <p>Description:</p>
              <p>{record.description}</p>
            </>
          ),
        }}
        dataSource={dataSource}
        loading={loadingTable}
        size="small"
      />
      {renderAddModal()}
      {renderUpdateModal()}
    </>
  );
};

export default Materials;
