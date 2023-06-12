import axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_API: api } = process.env;

export const fetchData = async (id) => {
  try {
    const { data } = await axios.get(`${api}/classes/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
    return data;
  } catch (error) {
    console.log(error);
  }
};
