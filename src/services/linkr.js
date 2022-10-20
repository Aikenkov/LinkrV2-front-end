import axios from "axios";

const BASE_URL = "https://localhost:5000";

function createHeaders() {
  const token = JSON.parse(localStorage.getItem("linkr")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}

function getTimeline() {
  const promise = axios.get(`${BASE_URL}/timeline`, config);
  return promise;
}

function getMetadata(body) {
  const promise = axios.get(`${BASE_URL}/metadata`, body);
  return promise;
}

export { getTimeline, getMetadata };
