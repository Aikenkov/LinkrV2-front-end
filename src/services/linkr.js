import axios from "axios";

const BASE_URL = "http://localhost:5000";

function createHeaders() {
  //const token = JSON.parse(localStorage.getItem("linkr")).token;

  const config = {
    headers: {
      Authorization: `Bearer 1234567`,
    },
  };

  return config;
}

function getTimeline() {
  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/timeline`, config);

  return promise;
}

function postMetadata(body) {

  const promise = axios.post(`${BASE_URL}/metadata`, body);

  return promise;
}

export { getTimeline, postMetadata };
