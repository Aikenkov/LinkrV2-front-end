import { useContext, useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";
import UserContext from "../contexts/userContexts";

export default function PostCommentsIcon({
    comments_length,
    openComment,
    setOpenComment,
}) {
    return (
        <Wrapper>
            <Comment
                onClick={() => {
                    setOpenComment(!openComment);
                }}
            />
            <h4>{comments_length} comments</h4>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 19px;

    && h4 {
        font-size: 11px;
        margin-top: 5px;
        color: var(--heavy-text);
        padding: 0;
        white-space: nowrap;
    }
`;

const Comment = styled(AiOutlineComment)`
    font-size: 24px;
    color: var(--heavy-text);
    cursor: pointer;
    user-select: none;
    :hover {
        transition: all 0.1s ease-in;
        filter: brightness(1.4);
    }
    :active {
        transform: translateY(2px);
        transition: all 0.2s ease-in;
    }
`;
