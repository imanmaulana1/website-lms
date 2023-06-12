import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callLogin } from "./Login.handler";

import styles from "./Login.module.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const values = await form.validateFields();
    await callLogin(values, navigate);
    setLoading(false);
    form.resetFields();
  };

  return (
    <div className={styles.container}>
      <h1>Welcome Back</h1>
      <p className={styles.text}>Please login with your personal info</p>
      <div className={styles.btnWrapper}>
        <Button className={styles.btn} onClick={() => navigate("/")}>
          Sign In
        </Button>
        <Button className={`${styles.btn} ${styles.active}`} onClick={() => navigate("/register")}>
          Sign Up
        </Button>
      </div>
      <Form form={form} onFinish={handleLogin} layout="vertical">
        <Form.Item name="email" rules={[{ required: true, type: "email" }]} className={styles.input}>
          <Input placeholder="Enter your email" prefix={<MailOutlined className={`${styles.iconInput} site-form-item-icon`} />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }, { type: "password" }, { min: 6 }]} className={styles.input}>
          <Input.Password placeholder="Enter your password" prefix={<LockOutlined className={`${styles.iconInput} site-form-item-icon`} />} />
        </Form.Item>
        <Button htmlType="submit" loading={loading} className={`${styles.btn} ${styles.login}`}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
