import { useEffect, useState } from "react";
import styled from "styled-components";

export default function PostComment({ comment, post_user }) {
    const { picture_uri, username, text, user_id } = comment;
    const [infoText, setInfoText] = useState("");

    useEffect(() => {
        if (post_user === user_id) {
            setInfoText("• post’s author");
        }
    });

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
