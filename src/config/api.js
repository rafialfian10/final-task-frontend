import axios from "axios";

export const API = axios.create({
  // baseURL: 'https://waysbook-backend-prod uction.up.railway.app/api/v1'
  baseURL: "http://localhost:5000/api/v1",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
