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

//const URL = "https://linkr-back-deploy.herokuapp.com";
const URL = "http://localhost:4000";

export function postSignUp(body) {
    const promise = axios.post(`${URL}/signup`, body);
    return promise;
}
export function postFollow(body) {
    const config = createHeaders();

    const promise = axios.post(`${URL}/follow`, body, config);
    return promise;
}
export function postSignIn(body) {
    const promise = axios.post(`${URL}/signin`, body);
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
    const config = createHeaders();
    const promise = axios.get(`${URL}/users/${id}`, config);
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
export function deleteFollow(body) {
    const config = createHeaders();
    
    const promise = axios.delete(`${URL}/follow`, {data: body, headers: config.headers});

    return promise;
}


export function getTrending() {
    const config = createHeaders();
    const promise = axios.get(`${URL}/trending`, config);
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
export async function getFollowing(id) {

    const config = createHeaders();


    const promise = await axios.get(`${URL}/follow/${id}`, config);
    return promise;
}

export function insertLike(post_id) {
    const config = createHeaders();
    const promise = axios.post(`${URL}/likes/${post_id}`, {}, config);
    return promise;
}

export function getHashtagPost(tag) {
    const config = createHeaders();
    const promise = axios.get(`${URL}/hashtag/${tag}`, config);
    return promise;
}

export async function getPostComments(post_id) {
    const promise = await axios.get(`${URL}/comments/${post_id}`);
    return promise;
}

export async function insertComments(body) {
    const config = createHeaders();
    const promise = await axios.post(`${URL}/comments`, body, config);
    return promise;
}

export function sharePost(post_id){
    const config = createHeaders();
    const promise = axios.post(`${URL}/share/${post_id}`, {}, config);
    return promise;
}

export function getSharesNumber(post_id){
    const config = createHeaders();
    const promise = axios.get(`${URL}/share/${post_id}`, config);
    return promise;
}