import { useEffect, useState, React, useContext } from "react";
import { postMetadata } from "../Service/api";
import LinkPreview from "./LinkPreview";
import styled from "styled-components";
import PostLikes from "./PostLikes";

export default function Post({ post }) {
    const [metadataUrl, setMetadaUrl] = useState([]);
    const { username, picture, text, link, id, user_id } = post;
    const body = { url: link };

    useEffect(() => {
        postMetadata(body)
            .catch((response) => {
                console.log(response);
            })
            .then((response) => {
                setMetadaUrl(response.data);
            });
    }, []);

    return (
        <PostContainer>
            <div>
                <Img src={picture} alt='perfil' />
                <PostLikes post={post} />
            </div>

            <span>
                <span>{username}</span>

                <p>{text}</p>

                <LinkPreview metadaUrl={metadataUrl} />
            </span>
        </PostContainer>
    );
}

const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    margin-bottom: 19px;
`;

const PostContainer = styled.div`
    width: 611px;
    height: fit-content;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    padding: 19px;
    margin-top: 16px;

    & > :first-child {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 18px;
    }

    p {
        margin-top: 8px;
        height: fit-content;
        white-space: wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        direction: ltr;
    }
`;
