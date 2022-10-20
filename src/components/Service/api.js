import axios from "axios";

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("userLinkr")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  return config;
}

const URL = "http://localhost:4000";

export function postSignUp(body) {
  const promise = axios.post(`${URL}/signup`, body);
  console.log(body, "************");
  return promise;
}
export function postSignIn(body) {
  const promise = axios.post(`${URL}/signin`, body);
  console.log(body, "************");
  return promise;
}

export function postPublish(body) {
  const config = createHeaders();
  const promise = axios.post(`${URL}/publish`, body, config);
  return promise;
}

export function getTimeline() {
  const config = createHeaders();
  const promise = axios.get(`${URL}/timeline`, config);
  return promise;
}

export function postMetadata(body) {
  const promise = axios.post(`${URL}/metadata`, body);
  return promise;
}
