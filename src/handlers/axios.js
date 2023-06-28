import axios from "axios";

const instance = axios.create({
  baseURL: "https://server-psychology-master-7a980fe5d8d2.herokuapp.com" /*|| "http://localhost:3333/"*/,
});

instance.interceptors.request.use((config) => {
  config.headers.authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
