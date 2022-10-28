import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { useContext, useState } from "react";
import { insertComments } from "../Service/api";
import UserContext from "../contexts/userContexts";

export default function NewComment(post_id) {
    const [text, setText] = useState("");
    const id = post_id.post_id;
    const { reload, setReload } = useContext(UserContext);
    const picture = JSON.parse(localStorage.getItem("userLinkr")).url;

    function CommentPost() {
        console.log(id);
        const body = {
            post_id: id,
            text,
        };
        insertComments(body)
            .catch((response) => {
                console.log(response);
            })
            .then(() => {
                setText("");
                setReload(reload + 1);
            });
    }

    return (
        <Wrapper>
            <img src={picture} alt='perfil' />
            <input
                type='text'
                placeholder='write a comment...'
                name='text'
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        CommentPost();
                    }
                }}
            ></input>
            <SendIcon onClick={() => CommentPost()} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 10px 23px 25px 25px;
    z-index: 2;

    img {
        border-radius: 50%;
        margin-right: 14px;
        height: 40px;
        width: 40px;
        object-fit: cover;
    }

    input {
        font-size: 14px;
        color: #acacac;
        width: 100%;
        border-radius: 8px;
        background-color: #252525;
        padding: 11px 27px 11px 11px;
        border: none;
        margin-bottom: 5px;
        outline: 0;
        height: 39px;
        resize: none;
    }

    input ::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: #575757;
        font-style: italic;
    }
`;

const SendIcon = styled(FiSend)`
    font-size: 15px;
    color: var(--heavy-text);
    cursor: pointer;
    user-select: none;
    position: absolute;
    bottom: 40px;
    right: 37px;

    :hover {
        transition: all 0.1s ease-in;
        filter: brightness(1.4);
    }
    :active {
        transform: translateY(2px);
        transition: all 0.2s ease-in;
    }
`;
