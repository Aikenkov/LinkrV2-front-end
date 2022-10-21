import { useEffect, useState, React, useContext } from "react";
import {
    getPostLikes,
    insertLike,
    postMetadata,
    removeUserLike,
} from "../Service/api";
import LinkPreview from "./LinkPreview";
import styled from "styled-components";
import { HiOutlineHeart } from "react-icons/hi";
import { BsFillHeartFill } from "react-icons/bs";
import UserContext from "../contexts/userContexts";

export default function Post({ post }) {
    const [metadataUrl, setMetadaUrl] = useState([]);
    const [postLikes, setPostLikes] = useState([]);
    const { reload, setReload } = useContext(UserContext);
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

    useEffect(() => {
        getPostLikes(id)
            .catch((response) => {
                console.log(response);
            })
            .then((response) => {
                setPostLikes(response.data);
            });
    }, [reload]);

    const userlike = postLikes.filter((e) => {
        return e.user_id === user_id;
    });

    function unlikePost() {
        console.log("delete");
        removeUserLike(id)
            .catch((response) => {
                console.log(response);
            })
            .then(() => {
                setReload(reload + 1);
            });
    }

    function likePost() {
        console.log("post");
        insertLike(id)
            .catch((response) => {
                console.log(response);
            })
            .then(() => {
                setReload(reload + 1);
            });
    }

    return (
        <PostContainer>
            <div>
                <Img src={picture} alt='perfil' />
                {userlike.length > 0 ? (
                    <FillHeart onClick={() => unlikePost()} />
                ) : (
                    <Heart onClick={() => likePost()} />
                )}
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

const Heart = styled(HiOutlineHeart)`
    font-size: 24px;
    color: var(--heavy-text);
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
