import axios from "axios";

const API = axios.create({
  baseURL: "https://gate-v2.onrender.com/api",
});

export default API;