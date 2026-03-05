import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3000/employees"
  baseURL: "https://employee-management-rsdk.onrender.com"
});

export default api;
