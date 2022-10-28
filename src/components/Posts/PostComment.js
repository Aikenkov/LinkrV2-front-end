import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/userContexts";
import { getSearchFollowed } from "../Service/api";

export default function PostComment({ comment, post_user }) {
    const { picture_uri, username, text, user_id } = comment;
    const [infoText, setInfoText] = useState("");
    const [followingUser, setFollowingUser] = useState(false);
    const { following } = useContext(UserContext);
    const { reload, setReload } = useContext(UserContext);

    useEffect(() => {
        if (following.length > 0) {
            const isFollowing = following.filter((e) => {
                return e.followed === user_id;
            });

            if (isFollowing.length > 0) {
                setFollowingUser(true);
            }
        }
    }, [reload]);

    useEffect(() => {
        if (followingUser) {
            setInfoText("• following");
        }
        if (post_user === user_id) {
            setInfoText("• post’s author");
        }
    }, [followingUser]);

    return (
        <Wrapper>
            <Comment>
                <img src={picture_uri} alt='perfil' />
                <div>
                    <h2>
                        {username} <span>{infoText}</span>
                    </h2>
                    <p>{text}</p>
                </div>
            </Comment>
            <Borda />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 25px;
`;

const Borda = styled.div`
    width: 100%;
    height: 1.1px;
    background-color: #353535;
`;

const Comment = styled.div`
    display: flex;
    min-height: 60px;
    width: 100%;

    img {
        border-radius: 50%;
        margin-right: 18px;
        height: 40px;
        width: 40px;
        object-fit: cover;
    }

    && p {
        color: #acacac;
        font-size: 14px;
        font-weight: 400;
    }

    && h2 {
        color: #f3f3f3;
        font-size: 14px;
        font-weight: 700;
        margin: 0;
        margin-bottom: 4px;
    }

    && span {
        color: #565656;
        font-size: 14px;
        font-weight: 400;
        margin: 0;
    }
`;
