import { useEffect, useState, React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postMetadata } from "../Service/api";
import ModalContainer from "./DeletePost";
import LinkPreview from "./LinkPreview";
import EditPostForm from "./EditPostForm";
import { DeleteIcon, EditIcon } from "../common/Icons";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import PostLikes from "./PostLikes";
import { ReactTagify } from "react-tagify";
import PostCommentsIcon from "./PostCommentsIcon";
import { getPostComments } from "../Service/api";
import UserContext from "../contexts/userContexts";
import PostComment from "./PostComment";
import NewComment from "./InsertComment";
export default function Post({ post }) {
    const { username, picture, text, link, id, user_id } = post;
    const [metadataUrl, setMetadaUrl] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editText, setEditText] = useState(text);
    const [openComment, setOpenComment] = useState(false);
    const { reload, setReload } = useContext(UserContext);
    const [postComments, setPostComments] = useState([]);

    const navigate = useNavigate();
    const body = { url: link };
    const myUsername = JSON.parse(localStorage.getItem("userLinkr")).username;

    useEffect(() => {
        postMetadata(body)
            .catch((response) => {
                console.log(response);
            })
            .then((response) => {
                setMetadaUrl(response.data);
            });
    }, [reload]);

    useEffect(() => {
        getPostComments(id).then((response) => {
            if (response) {
                setPostComments(response.data);
            }
        });
    }, [reload]);

    function deletePost() {
        setIsOpen(true);
    }

    function editedPost() {
        setEditOpen(!editOpen);

        if (editOpen) {
            setEditText(text);
        }
    }

    return (
        <>
            <ToastContainer />

            {modalIsOpen ? (
                <ModalContainer
                    modalIsOpen={modalIsOpen}
                    setIsOpen={setIsOpen}
                    id={id}
                />
            ) : null}

            <PostContainer>
                <div>
                    <Link to={`/user/${user_id}`}>
                        <Img src={picture} alt='perfil' />
                    </Link>
                    <PostLikes post={post} />
                    <PostCommentsIcon
                        comments_length={postComments.length}
                        setOpenComment={setOpenComment}
                        openComment={openComment}
                    />
                </div>

                <span>
                    {myUsername === username ? (
                        <MyUserDelete>
                            <Link to={`/user/${user_id}`}>
                                <span>{username}</span>
                            </Link>

                            <div>
                                <span>
                                    <EditIcon onClick={editedPost} />
                                </span>

                                <DeleteIcon onClick={deletePost} />
                            </div>
                        </MyUserDelete>
                    ) : (
                        <Link to={`/user/${user_id}`}>
                            <span>{username}</span>
                        </Link>
                    )}

                    {editOpen ? (
                        <EditPostForm
                            id={id}
                            text={text}
                            editText={editText}
                            setEditText={setEditText}
                            setEditOpen={setEditOpen}
                        />
                    ) : (
                        <ReactTagify
                            colors={"#FFFFFF"}
                            tagClicked={(tag) => {
                                let noHash = tag.replace("#", "");
                                navigate(`/hashtag/${noHash}`);
                            }}
                        >
                            <p>{text}</p>
                        </ReactTagify>
                    )}

                    {metadataUrl.length === 0 ? (
                        <ThreeDots color={"#B7B7B7"} height={70} width={50} />
                    ) : (
                        <LinkPreview metadataUrl={metadataUrl} />
                    )}
                </span>
            </PostContainer>
            <PostCommentsContainer open={openComment}>
                {postComments.map((comment, i) => {
                    return (
                        <PostComment
                            key={i}
                            comment={comment}
                            post_user={user_id}
                        />
                    );
                })}
                <NewComment post_id={id} />
            </PostCommentsContainer>
        </>
    );
}

const PostCommentsContainer = styled.div`
    height: fit-content;
    width: 100%;
    z-index: 0;
    border-radius: 0 0 16px 16px;
    background-color: #1e1e1e;

    transition: all ease-in 0.5s;
    transition: transform ease-in 0.2s;

    ${(props) => {
        if (props.open) {
            return `opacity: 1; height: fit-content; padding-top: 20px; transform: translateY(-20px);`;
        } else {
            return ` opacity: 0; height: 0px; visibility: hidden; ;transform: translateY(-200px);`;
        }
    }}

    @media (max-width: 767px) {
        width: 100vw;
        border-radius: 0px;
    }
`;

const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    margin-bottom: 19px;
`;

const PostContainer = styled.div`
    width: 100%;
    max-width: 611px;
    height: fit-content;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    padding: 19px;
    margin-top: 16px;
    z-index: 1;

    a {
        color: #ffffff;
        font-weight: 400;
    }

    textarea {
        background-color: #ffffff;
        color: #171717;
        width: 100%;
        height: fit-content;
        overflow-y: hidden;
        overflow-x: hidden;
        border-radius: 7px;
        font-size: 14px;
        margin-top: 5px;
        border: none;
    }

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
        color: #b7b7b7;
    }

    > span {
        width: 87%;
        max-width: 503px;
    }

    @media (max-width: 767px) {
        width: 100vw;
        max-width: 100vw;

        border-radius: 0px;
        padding-right: 28px;
        box-sizing: border-box;

        > span {
            width: 85%;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        > span {
            width: 90%;
        }
    }
`;

const MyUserDelete = styled.div`
    display: flex;
    justify-content: space-between;

    span {
        margin-right: 10px;
    }

    div {
        cursor: pointer;
    }
`;
