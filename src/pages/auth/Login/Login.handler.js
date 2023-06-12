import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_API: api } = process.env;

export const callLogin = async (values, navigate) => {
  try {
    const { data } = await axios.post(`${api}/login`, values);
    console.log(data)
    Cookies.set("token", data.token.token);
    Cookies.set("idUser", data.data.id);
    Cookies.set("username", data.data.name);
    Cookies.set("role", data.data.role);
    message.open({
      type: "success",
      content: "Login Successfull",
      duration: 5,
    });
    navigate("/classes");
  } catch (error) {
    console.log(error);
    if (!error.response?.data?.errors) {
      if (error.response.data.error) {
        message.open({
          type: "error",
          content: "Password yang anda masukkan salah!",
          duration: "5",
        });
      } else {
        message.open({
          type: "error",
          content: error.response.data.message,
          duration: "5",
        });
      }
    } else {
      message.open({
        type: "error",
        content: "Email yang anda masukkan salah atau tidak terdaftar dalam sistem!",
        duration: "5",
      });
    }
  }
};
