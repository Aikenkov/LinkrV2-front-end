import { useState } from "react";
import styled from "styled-components";

export default function NewPost() {
    const [form, setForm] = useState({
        link: "",
        text: "",
    });
    const buttonText = "publish";

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Wrapper>
            <div>
                <img src='https://i.pinimg.com/736x/f8/f3/01/f8f301698392ee89abd583fe98c83a54.jpg' />
            </div>
            <button>{buttonText}</button>
            <div>
                <p>What are you going to share today?</p>
                <textarea
                    type='url'
                    placeholder='link'
                    name='link'
                    onChange={handleForm}
                    value={form.link}
                ></textarea>
                <textarea
                    type='text'
                    placeholder='text'
                    name='text'
                    onChange={handleForm}
                    value={form.text}
                ></textarea>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;

    width: 100%;
    min-height: 209px;
    position: relative;

    margin-top: 43px;
    border-radius: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    background-color: var(--heavy-text);

    img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
    }

    & > :first-child {
        height: 100%;
        padding: 16px;
    }
    & > :last-child {
        width: 100%;
        padding: 21px 21px 0 0;
    }

    p {
        font-size: 20px;
        font-weight: 300;
        color: var(--light-text);
        margin-bottom: 10px;
    }

    button {
        position: absolute;
        right: 22px;
        bottom: 16px;
        width: 112px;
        height: 31px;
        color: var(--heavy-text);
        font-weight: 700;
        background-color: #1877f2;
        border: none;
        border-radius: 5px;
    }

    textarea {
        opacity: 0.8;
        font-size: 15px;
        color: var(--light-text);
        width: 100%;
        border-radius: 5px;
        background-color: var(--light-background);
        padding: 5px 13px;
        border: none;
        margin-bottom: 5px;
        outline: 0;
        height: 30px;
        resize: none;
    }

    textarea::placeholder {
        opacity: 0.4;
    }

    & > :last-child :last-child {
        height: 66px;
        margin-bottom: 52px;
    }
`;
