import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../Posts/Post";
import styled from "styled-components";
import Trending from "../home/Trending";
import { getUser, getUserPosts } from "../Service/api";

export default function UserPosts(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [user,setUser] = useState({});
    useEffect(() => {
        console.log("Entrei no use effect")
        const userPromisse = getUser(id);
        userPromisse.then(p => setUser({...p.data}));
        userPromisse.catch(p=> {alert("Este usuario não existe"); navigate("/home")});
        const postsPromisse = getUserPosts(id);
        postsPromisse.then(p => setPosts([...p.data]));
    },[]);
    return(
        <Wrapper>
            <Page>
                <div>
                    <img src={user?.picture}/>
                    <h1>{user?.username}'s posts </h1>
                </div>
                {posts.map((posts) => (<Post key={posts.id} post={posts} />))}
            </Page>
                <Trending />
        </Wrapper>

    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Page = styled.div`
    width: 40vw;
    max-width: 611px;
    margin-right: 25px;
    margin-top: 125px;
    div{
        display: flex;
        img {
            width: 53px;
            height: 53px;
            border-radius: 50%;
            margin-right: 17px;
            object-fit: cover;
        }
        h1 {
            font-family: "Oswald", sans-serif;
            font-size: 43px;
            font-weight: 700;
            color: var(--heavy-text);
        }
    }
`;
