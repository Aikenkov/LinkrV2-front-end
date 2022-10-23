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
//const URL = "https://linkr-back-deploy.herokuapp.com/";

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
export function getSearchUsers(name) {
    const config = createHeaders();

    const promise = axios.get(`${URL}/search?name=${name}`, config);
    return promise;
}

export async function postMetadata(body) {
    const promise = await axios.post(`${URL}/metadata`, body);
    return promise;
}

export function getUser(id) {
    const promise = axios.get(`${URL}/users/${id}`);
    return promise;
}

export function getUserPosts(id) {
    const config = createHeaders();
    const promise = axios.get(`${URL}/user/${id}`, config);
    return promise;
}

export function deletePost(id) {
    const config = createHeaders();

    const promise = axios.delete(`${URL}/posts/${id}`, config);
    return promise;
}

export function getTrending() {
    const promise = axios.get(`${URL}/trending`);
    return promise;
}

export function editPost(body, id) {
    const config = createHeaders();

    const promise = axios.put(`${URL}/posts/${id}`, body, config);
    return promise;
}

export function removeUserLike(post_id) {
    const config = createHeaders();
    const promise = axios.delete(`${URL}/likes/${post_id}`, config);
    return promise;
}

export async function getPostLikes(post_id) {
    const promise = await axios.get(`${URL}/likes/${post_id}`);
    return promise;
}

export function insertLike(post_id) {
    const config = createHeaders();
    const promise = axios.post(`${URL}/likes/${post_id}`, {}, config);
    return promise;
}

export async function getHashtagPost(tag) {
    const promise = axios.get(`${URL}/hashtag/${tag}`);
    return promise;
}
