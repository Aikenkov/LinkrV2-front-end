import { useEffect, useState, React } from "react";
import { postMetadata } from "../Service/api";
import LinkPreview from "./LinkPreview";
import styled from "styled-components";
import { HiOutlineHeart } from "react-icons/hi";
import { BsFillHeartFill } from "react-icons/bs";

export default function Post({ post }) {
    const [metadataUrl, setMetadaUrl] = useState([]);
    const { username, picture, text, link, id, user_id } = post;
    const body = { url: link };
    const like_body = { post_id: id };

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
                <FillHeart />
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

const FillHeart = styled(BsFillHeartFill)`
    font-size: 20px;
    color: var(--liked-heart);
    cursor: pointer;
    user-select: none;

    :hover {
        transition: all 0.1s ease-in;
        filter: brightness(1.2);
    }

    :active {
        transform: translateY(2px);
        transition: all 0.2s ease-in;
    }
`;

const PostContainer = styled.div`
    width: 611px;
    height: fit-content;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    padding: 19px;
    margin-top: 16px;

    p {
        margin-top: 8px;
        height: fit-content;
        white-space: wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        direction: ltr;
    }

    & > :first-child {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 18px;
    }
`;
