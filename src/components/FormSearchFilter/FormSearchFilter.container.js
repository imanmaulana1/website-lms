import { Form, Select } from "antd";
import Search from "antd/es/input/Search";
import React from "react";

import styles from "./FormSearchFilter.module.css"

const FormSearchFilter = ({ owners, labels, handleChangeLabel, handleChangeOwner, onSearch }) => {
  const OPTION_LABEL = [{ value: "", label: "" }, ...labels];
  const OPTION_OWNER = [{ value: "", label: "" }, ...owners];
  return (
    <Form layout="vertical">
      <div className={styles.inputWrapper}>
        <Form.Item label="Name :" name="name">
          <Search
            placeholder="Search material name..."
            allowClear
            onSearch={onSearch}
            style={{
              width: 300,
            }}
          />
        </Form.Item>
        <Form.Item label="Label :" name="label">
          <Select
            onChange={handleChangeLabel}
            style={{
              width: 150,
            }}
            options={OPTION_LABEL}
          />
        </Form.Item>
        <Form.Item label="Owner :" name="owner">
          <Select
            onChange={handleChangeOwner}
            style={{
              width: 200,
            }}
            options={OPTION_OWNER}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormSearchFilter;
