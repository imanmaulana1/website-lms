import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_API: api } = process.env;

export const fetchData = async (search, dataTable) => {
  try {
    const { data } = await axios.get(`${api}/users?page=${dataTable.current}&limit=${dataTable.size}&keyword=${search}&role`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const detailData = async (id) => {
  try {
    const { data } = await axios.get(`${api}/users/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async (id) => {
  try {
    const { data } = await axios.delete(`${api}/users/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: data.message,
      duration: 5,
    });
  } catch (error) {
    message.open({
      type: "error",
      content: error.message,
      duration: 5,
    });
  }
};

export const postData = async (values, form, setAddModal) => {
  const { ktp, name, email, phone, role, password, password_confirmation, is_verified: isVerified } = values;
  try {
    const { data } = await axios.post(`${api}/users`, { ktp, name, email, phone, role, password, password_confirmation, isVerified }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
    form.resetFields();
    setAddModal();
  } catch (error) {
    message.open({
      type: "error",
      content: "Email has already been taken",
      duration: 3,
    });
  }
};

export const editData = async (id, values, form, setUpdateModal) => {
  const { ktp, name, phone, role, is_verified } = values;

  try {
    const { data } = await axios.put(`${api}/users/${id}`, { ktp, name, phone, role, isVerified: is_verified }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
    form.resetFields();
    setUpdateModal(false);
  } catch (error) {
    message.open({
      type: "error",
      content: error,
      duration: 3,
    });
  }
};
