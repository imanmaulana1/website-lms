import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const values = await form.validateFields();
    console.log(values);
    setTimeout(() => {
      message.open({
        type: "info",
        content: "Fitur register masih dalam pengembangan. Silahkan login menggunakan akun yang sudah ada",
        duration: 5,
      });
      setLoading(false);
    }, 1500);

    form.resetFields();
  };
  return (
    <div className={styles.container}>
      <h1>Hello, Friend</h1>
      <p className={styles.text}>Enter your personal details and start journey with us</p>
      <div className={styles.btnWrapper}>
        <Button className={`${styles.btn} ${styles.active}`} onClick={() => navigate("/")}>
          Sign In
        </Button>
        <Button className={styles.btn} onClick={() => navigate("/register")}>
          Sign Up
        </Button>
      </div>
      <Form form={form} onFinish={handleRegister} layout="vertical">
        <Form.Item name="name" rules={[{ required: true }]} className={styles.input}>
          <Input placeholder="Enter your name" prefix={<UserOutlined className={`${styles.iconInput} site-form-item-icon`} />} />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, type: "email" }]} className={styles.input}>
          <Input placeholder="Enter your email" prefix={<MailOutlined className={`${styles.iconInput} site-form-item-icon`} />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }, { type: "password" }, { min: 6 }]} className={styles.input}>
          <Input.Password placeholder="Enter your password" prefix={<LockOutlined className={`${styles.iconInput} site-form-item-icon`} />} />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          rules={[
            { required: true },
            { type: "password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) return Promise.resolve();
                return Promise.reject(new Error("Password yang anda masukkan tidak sama!"));
              },
            }),
          ]}
          className={styles.input}
        >
          <Input.Password placeholder="Confirmation password" prefix={<LockOutlined className={`${styles.iconInput} site-form-item-icon`} />} />
        </Form.Item>
        <Button htmlType="submit" loading={loading} className={`${styles.btn} ${styles.register}`}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
