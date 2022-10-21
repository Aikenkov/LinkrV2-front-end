import { useEffect, useState, React } from "react";
import { Link } from "react-router-dom";
import { postMetadata } from "../Service/api";
import ModalContainer from "./DeletePost";
import LinkPreview from "./LinkPreview";
import EditPostForm from "./EditPostForm";
import { DeleteIcon, EditIcon } from "../common/Icons";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export default function Post({ post }) {
  const { username, picture, text, link, id, user_id } = post;

  const [metadataUrl, setMetadaUrl] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editText, setEditText] = useState(text);

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
        <Link to={`/user/${user_id}`}>
          <Img src={picture} alt="perfil" />
        </Link>

        <span>
          {myUsername === username ? (
            <MyUserDelete>
              <span>{username}</span>
              <div>
                <span>
                  <EditIcon onClick={editedPost} />
                </span>

                <DeleteIcon onClick={deletePost} />
              </div>
            </MyUserDelete>
          ) : (
            <span>{username}</span>
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
            <p>{text}</p>
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
  margin-right: 18px;
`;

const PostContainer = styled.div`
  width: 611px;
  height: fit-content;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  padding: 19px;
  margin-top: 16px;

  textarea {
    background-color: #ffffff;
    color: #171717;
    width: 100%;
    height: 50px;
    overflow-y: hidden;
    overflow-x: hidden;
    border-radius: 7px;
    font-size: 14px;
    margin-top: 5px;
  }

  p {
    margin-top: 8px;
    height: fit-content;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;
  }
`;

const MyUserDelete = styled.div`
  display: flex;
  justify-content: space-between;
  width: 503px;

  span {
    margin-right: 10px;
  }

  div {
    cursor: pointer;
  }
`;
