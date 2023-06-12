import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_API: api } = process.env;

export const fetchMember = async (idClass, dataTable, search) => {
  try {
    const { data } = await axios.get(`${api}/classes/${idClass}/members?page=${dataTable.current}&limit=${dataTable.size}&keyword=${search}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = async () => {
  try {
    const { data } = await axios.get(`${api}/users?role=`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleMember = async (id) => {
  try {
    const { data } = await axios.get(`${api}/members/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const postMember = async (idClass, payload) => {
  try {
    const { data } = await axios.post(`${api}/classes/${idClass}/members`, payload, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editMember = async (id, values, form, setUpdateModal) => {
  try {
    const { data } = await axios.put(`${api}/members/${id}`, { role: values.role }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
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

export const removeMember = async (id) => {
  try {
    const { data } = await axios.delete(`${api}/members/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
  } catch (error) {
    console.log(error);
  }
};
