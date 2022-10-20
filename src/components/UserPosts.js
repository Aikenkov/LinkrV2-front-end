import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function UserPosts(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [user,setUser] = useState({});
    useEffect(() => {
        console.log("Entrei no use effect")
        const userPromisse = axios.get(`http://localhost:4489/users/${id}`);
        userPromisse.then(p => setUser({...p.data}));
        userPromisse.catch(p=> {alert("Este usuario não existe"); navigate("/home")});
        const postsPromisse = axios.get(`http://localhost:4489/user/${id}`);
        postsPromisse.then(p => setPosts([...p.data]));
    },[]);
    return(
        <>
                <img src={user?.picture}/>
                <h1>{user?.username}</h1>
        </>
    )
}