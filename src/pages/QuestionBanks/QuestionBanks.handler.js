import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_API: api } = process.env;

export const fetchData = async (dataTable) => {
  try {
    const { data } = await axios.get(`${api}/question-banks/?page=${dataTable.current}&limit=${dataTable.size}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const detailData = async (id) => {
  try {
    const { data } = await axios.get(`${api}/question-banks/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const postData = async (values, form, setAddModal) => {
  try {
    const { data } = await axios.post(`${api}/question-banks`, values, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
    setAddModal(false);
    form.resetFields();
  } catch (error) {
    message.open({
      type: "error",
      content: "Field name you entered already exists. Please try again with different name!",
      duration: 5,
    });
  }
};

export const removeData = async (id) => {
  try {
    const { data } = await axios.delete(`${api}/question-banks/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: data.message,
      duration: 5,
    });
  } catch (error) {
    message.open({
      type: "success",
      content: error.message,
      duration: 5,
    });
  }
};

export const editData = async (id, values, form, setUpdateModal) => {
  const { name, major, classGrade } = values;
  try {
    const { data } = await axios.put(`${api}/question-banks/${id}`, { name, major, classGrade }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
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
      content: "Field name you entered already exists. Please try again with different name!",
      duration: 5,
    });
  }
};
