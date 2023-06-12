import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";

const { REACT_APP_API: api } = process.env;

export const fetchData = async (idClass, filter, label, ownerId, dataTable) => {
  try {
    const { data } = await axios.get(`${api}/materials?page=${dataTable.current}&limit=${dataTable.size}&keyword=${filter}&classId=${idClass}&label=${label}&ownerId=${ownerId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const detailData = async (id) => {
  try {
    const { data } = await axios.get(`${api}/materials/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = async () => {
  try {
    const { data } = await axios.get(`${api}/users?role=trainer`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const postData = async (values, idClass, isSchedule) => {
  try {
    const { data } = await axios.post(
      `${api}/materials`,
      {
        ...values,
        schedule: isSchedule ? values.schedule.format("YYYY-MM-DD HH:mm:ss") : "",
        classId: idClass,
        material_1: {
          "<b>": "ini adalah JSON dari html, material_2 & material_3 optional",
        },
      },
      { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
    );
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editData = async (values, materialId, isSchedule) => {
  console.log(values);

  try {
    const { data } = await axios.put(`${api}/materials/${materialId}`, values, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
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
    const { data } = await axios.delete(`${api}/materials/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
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
