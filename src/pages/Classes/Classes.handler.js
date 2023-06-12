import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_API: api } = process.env;

export const fetchData = async (search, current) => {
  try {
    const { data } = await axios.get(`${api}/classes?keyword=${search}&limit=2&page=${current}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const singleData = async (id) => {
  try {
    const { data } = await axios.get(`${api}/classes/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export const postData = async (values, form, setAddModal) => {
  try {
    const { data } = await axios.post(`${api}/classes`, { name: values.name, description: values.description, active: values.active }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
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
      content: error,
      duration: 3,
    });
  }
};

export const removeData = async (id) => {
  try {
    const { data } = await axios.delete(`${api}/classes/${id}`, {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
      data: { deleteImageOnly: false },
    });
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editData = async (id, values, form, setUpdateModal) => {
  try {
    const { data } = await axios.put(`${api}/classes/${id}`, { name: values.name, description: values.description, active: values.active }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
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
