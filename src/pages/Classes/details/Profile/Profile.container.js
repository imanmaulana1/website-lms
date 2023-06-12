import React, { useEffect, useState } from "react";
import { editData, fetchData } from "./Profile.handler";

import { faClose, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Skeleton } from "antd";

import styles from "./Profile.module.css";
import { useForm } from "antd/es/form/Form";
import Cookies from "js-cookie";

const Profile = () => {
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    setIsLoading(true);
    const res = await fetchData();

    form.setFieldsValue({
      name: res.name,
      email: res.email,
      phone: res.phone,
      ktp: res.ktp,
      role: res.role,
    });
    setIsLoading(false);
  };

  const updateData = async () => {
    const values = await form.validateFields();
    console.log(values);
    await editData(Cookies.get("idUser"), values, form);
    setIsEdit(true);
    await getUser();
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <Skeleton active />
        </div>
      ) : (
        <>
          <div className={styles.headerWrapper}>
            <h3 className={styles.textHeader}>My Profile</h3>
            <div className={styles.btnWrapper}>
              <Button type="primary" className={`${styles.btn}`} onClick={() => setIsEdit(!isEdit)}>
                <FontAwesomeIcon icon={isEdit ? faEdit : faClose} style={{ fontSize: "12px", marginRight: "5px" }} /> <span style={{ fontSize: "12px" }}>{isEdit ? "Edit Profile" : "Cancel"}</span>
              </Button>
              <Button type="primary" className={`${styles.btn}`} onClick={updateData} disabled={isEdit}>
                <FontAwesomeIcon icon={faSave} style={{ fontSize: "12px", marginRight: "5px" }} /> <span style={{ fontSize: "12px" }}>Save</span>
              </Button>
            </div>
          </div>
          <Form form={form}>
            <ul className={styles.listUser}>
              <li>
                <p>Email</p>
                <Form.Item name="email" id="email" className={styles.inputWrapper}>
                  <Input className={styles.input} disabled={true} />
                </Form.Item>
              </li>
              <li>
                <p>Name</p>
                <Form.Item name="name" id="name" className={styles.inputWrapper}>
                  <Input className={styles.input} disabled={isEdit} />
                </Form.Item>
              </li>
              <li>
                <p>Phone</p>
                <Form.Item name="phone" id="phone" rules={[{ min: 7 }, { pattern: new RegExp("^([0-9]*)$"), message: "Input must be only number" }]} className={styles.inputWrapper}>
                  <Input className={styles.input} disabled={isEdit} />
                </Form.Item>
              </li>
              <li>
                <p>KTP</p>
                <Form.Item name="ktp" id="ktp" rules={[{ min: 14 }, { pattern: new RegExp("^([0-9]*)$"), message: "Input must be only number" }]} className={styles.inputWrapper}>
                  <Input className={styles.input} disabled={isEdit} />
                </Form.Item>
              </li>
              <li>
                <p>Role</p>
                <Form.Item name="role" id="role" className={styles.inputWrapper}>
                  <Input className={styles.input} disabled={true} />
                </Form.Item>
              </li>
            </ul>
          </Form>
        </>
      )}
    </>
  );
};

export default Profile;
