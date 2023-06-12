import axios from "axios";
import Cookies from "js-cookie";
// import { message } from "antd";

const { REACT_APP_API: api } = process.env;

export const fetchDetailMaterial = async (id) => {
  try {
    const { data } = await axios.get(`${api}/materials/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data;
  } catch (error) {
    console.log(error);
  }
};
