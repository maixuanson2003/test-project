import axios from "axios";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Access-Control-Allow-Methods": "DELETE,GET,PATCH,POST,PUT",
};
const request = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: headers,
});
export default request;
