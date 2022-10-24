import { useEffect, useState, React } from "react";
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

export default function Post({ post }) {
    const { username, picture, text, link, id, user_id } = post;

    const [metadataUrl, setMetadaUrl] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editText, setEditText] = useState(text);

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
    }, []);

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
        </>
    );
}

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
