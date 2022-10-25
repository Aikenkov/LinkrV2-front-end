import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function PostComments({ post }) {
    const { id, user_id } = post;

    return (
        <Wrapper>
            <Comment />
            <h4>0 comments</h4>
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
