import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_API: api } = process.env;

export const fetchAllData = async (idBank) => {
  try {
    const { data } = await axios.get(`${api}/question-banks/${idBank}/questions`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchDetailData = async (idQuestion) => {
  try {
    const res = await axios.get(`${api}/questions/${idQuestion}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postData = async (idBank, values, form) => {
  const { a, b, c, d, e, answerKey, private: isPrivate, question } = values;
  try {
    const { data } = await axios.post(`${api}/question-banks/${idBank}/questions`, { a, b, c, d, e, answerKey, question, isPrivate }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    console.log(data);
    form.resetFields();
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (id) => {
  try {
    const res = await axios.delete(`${api}/questions/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: res.data.message,
      duration: 3,
    });
  } catch (error) {
    alert(error);
  }
};

export const editData = async (id, values, form, setUpdateModal) => {
  const { question, a, b, c, d, e, answerKey, private: isPrivate } = values;
  try {
    const { data } = await axios.put(`${api}/questions/${id}`, { question, a, b, c, d, e, answerKey, isPrivate }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
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
