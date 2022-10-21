import { useEffect, useState, React, useContext } from "react";
import { getTimeline } from "../Service/api";
import Post from "./Post";
import styled from "styled-components";
import UserContext from "../contexts/userContexts";

export default function Posts() {
    const [post, setPost] = useState([]);
    const { reload, setReload } = useContext(UserContext);
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        getTimeline()
            .catch(() => {
                setMessage(
                    "An error occured while trying to fetch the posts, please refresh the page"
                );
            })
            .then((response) => {
                setPost(response.data);

                if (response.data.length === 0) {
                    setMessage("There are no posts yet");
                }
            });
    }, [reload]);

    console.log(post);

    return post.length === 0 ? (
        <NoPosts>{message}</NoPosts>
    ) : (
        <Wrapper>
            {post.map((posts) => (
                <Post key={posts.id} post={posts} />
            ))}
        </Wrapper>
    );
}

const NoPosts = styled.h2`
    color: #ffffff;
    font-family: Lato;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    font-weight: 400;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-family: Lato;

    span {
        font-size: 19px;
    }

    p {
        font-size: 17px;
        color: #b7b7b7;
        margin-top: 7px;
    }
`;
