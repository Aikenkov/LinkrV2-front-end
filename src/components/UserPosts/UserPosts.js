import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
import Trending from "../home/Trending";
import Timeline from "../timeline/Timeline";

export default function UserPosts(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [user,setUser] = useState({});
    useEffect(() => {
        console.log("Entrei no use effect")
        const userPromisse = axios.get(`http://localhost:4000/users/${id}`);
        userPromisse.then(p => setUser({...p.data}));
        userPromisse.catch(p=> {alert("Este usuario não existe"); navigate("/home")});
        const postsPromisse = axios.get(`http://localhost:4000/user/${id}`);
        postsPromisse.then(p => setPosts([...p.data]));
    },[]);
    return(
        <Wrapper>
            <h1>{user?.name}'s Page</h1>
            <Timeline/>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    h1 {
        color: black;
    }
`;
