import axios from "axios";
// const baseUrl = "http://localhost:8080";
const baseUrl = "http://birthdayblitzhub.online:8080/";

const config = {
  baseUrl,
  timeout: 3000000,
};
const api = axios.create(config);
api.defaults.baseURL = baseUrl;
const handleBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};
const handleError = (error) => {
  console.log(error);
  return;
};
api.interceptors.request.use(handleBefore, null);
// api.interceptors.response.use(null, handleError);

export default api;
// import axios from "axios";

// const baseUrl = "http://birthdayblitzhub.online:8080/";

// const config = {
//   baseUrl,
//   timeout: 3000000,
// };

// const api = axios.create(config);

// api.defaults.baseURL = baseUrl;

// const handleBefore = (config) => {
//   const token = localStorage.getItem("token")?.replaceAll('"', "");
//   config.headers["Authorization"] = `Bearer ${token}`;
//   config.headers["Access-Control-Allow-Origin"] = "*"; // Thêm header này để bypass CORS
//   return config;
// };

// const handleError = (error) => {
//   console.log(error);
//   return;
// };

// api.interceptors.request.use(handleBefore, null);
// // api.interceptors.response.use(null, handleError);

// export default api;
