import { useContext, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { postPublish } from "../Service/api";
import UserContext from "../contexts/userContexts";
export default function NewPost() {
    const { reload, setReload } = useContext(UserContext);
    const [form, setForm] = useState({
        link: "",
        text: "",
    });
    const [isloading, setIsLoading] = useState(false);
    const image = JSON.parse(localStorage.getItem("userLinkr")).url;
    const validUrl = new RegExp(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%\+.~#?&\/=]*)$/
    );

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function publish() {
        setIsLoading(true);

        if (!validUrl.test(form.link)) {
            toast.error("Houve um erro ao publicar seu link");
            setTimeout(() => setIsLoading(false), 1000);
            return;
        }
        postPublish(form)
            .then((res) => {
                setIsLoading(false);
                setReload(reload + 1);
                setForm({
                    link: "",
                    text: "",
                });
            })
            .catch((err) => {
                setTimeout(() => setIsLoading(false), 1000);
                toast.error("Houve um erro ao publicar seu link");
            });
    }

    return (
        <Wrapper>
            <div>
                <img src={image} />
            </div>
            <ToastContainer />
            {isloading ? (
                <button disabled={isloading}>
                    <p>Publishing...</p>
                </button>
            ) : (
                <button onClick={publish}>
                    <p>Publish</p>
                </button>
            )}
            <div>
                <h3>What are you going to share today?</h3>
                <textarea
                    disabled={isloading}
                    type='url'
                    placeholder='link'
                    name='link'
                    onChange={handleForm}
                    value={form.link}
                ></textarea>
                <textarea
                    disabled={isloading}
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
        object-fit: cover;
    }

    & > :first-child {
        height: 100%;
        padding: 16px;
    }
    & > :last-child {
        width: 100%;
        padding: 21px 21px 0 0;
    }

    h3 {
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
        text-align: center;

        :hover {
            filter: brightness(1.2);
            cursor: pointer;
        }
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

    @media only screen and (max-width: 767px) {
        border-radius: 0;
        text-align: center;
        padding: 0 15px;
        min-height: 164px;

        & > :first-child {
            display: none;
        }

        & > :last-child {
            width: 100%;
            padding: 21px 0 0;
        }

        button {
            height: 22px;
            bottom: 12px;
            right: 15px;
        }

        & > :last-child :last-child {
            height: 47px;
            margin-bottom: 40px;
        }
    }
`;
