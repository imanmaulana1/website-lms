import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_API: api } = process.env;

export const fetchData = async () => {
  try {
    const { data } = await axios.get(`${api}/users/${Cookies.get("idUser")}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const editData = async (id, values, form) => {
  const { ktp, name, phone, role, is_verified } = values;

  try {
    const { data } = await axios.put(`${api}/users/${id}`, { ktp, name, phone, role, isVerified: is_verified }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    message.open({
      type: "success",
      content: data.message,
      duration: 3,
    });
    form.resetFields();
  } catch (error) {
    message.open({
      type: "error",
      content: error,
      duration: 3,
    });
  }
};
