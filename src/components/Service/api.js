import axios from "axios";

const URL = "http://localhost:4000";

export function postSignUp(body){
    const promise = axios.post(`${URL}/signup`, body);
    console.log(body, '************')
    return promise;
}
 export function postSignIn(body){
        const promise = axios.post(`${URL}/signin`, body);
        console.log(body, '************')
        return promise;
        
    }
