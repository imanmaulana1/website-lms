import { Form, Input, Radio, Select } from "antd";
import React from "react";

const FormUser = ({ form, options, disabledEmail, disabledPassword }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="KTP" name="ktp" id="ktp" rules={[{ required: true }, { min: 14 }, { pattern: new RegExp("^([0-9]*)$"), message: "Input must be only number" }]}>
        <Input placeholder={"Enter your No.KTP"} />
      </Form.Item>
      <Form.Item label="Name" name="name" id="name" rules={[{ required: true, min: 14 }]}>
        <Input placeholder={"Enter your name"} />
      </Form.Item>
      <Form.Item label="Email" name="email" id="email" rules={[{ required: true, type: "email" }]}>
        <Input placeholder={"Enter your email"} disabled={disabledEmail} />
      </Form.Item>
      <Form.Item label="Phone" name="phone" id="phone" rules={[{ required: true }, { min: 7 }, { pattern: new RegExp("^([0-9]*)$"), message: "Input must be only number" }]}>
        <Input placeholder={"Enter your No.Phone"} />
      </Form.Item>
      <Form.Item label="Role" name="role" id="role" rules={[{ required: true }]}>
        <Select options={options} placeholder={"Select your role"} />
      </Form.Item>
      <Form.Item label="Password" name="password" id="password" rules={[{ required: true }, { type: "password" }, { min: 6 }]}>
        <Input.Password placeholder={"Enter your password"} disabled={disabledPassword}  id="password" />
      </Form.Item>
      <Form.Item
        label="Password Confirmation"
        name="password_confirmation"
        id="password_confirmation"
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
      >
        <Input.Password placeholder={"Enter your re-password"} disabled={disabledPassword}   id="password_confirmation" />
      </Form.Item>
      <Form.Item label="Verified" name="is_verified" id="is_verified" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value={false}>Not Verified</Radio>
          <Radio value={true}>Verified</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default FormUser;
