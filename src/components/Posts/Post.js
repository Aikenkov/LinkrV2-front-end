import { useEffect, useState, React } from "react";
import { postMetadata } from "../Service/api";
import ModalContainer from "./DeletePost";
import LinkPreview from "./LinkPreview";
import { DeleteIcon } from "../common/Icons";
import styled from "styled-components";

export default function Post({ post }) {
  const [metadataUrl, setMetadaUrl] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const { username, picture, text, link, id } = post;
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

  return (
    <>
      {modalIsOpen ? (
        <ModalContainer modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} id={id}/>
      ) : null}

      <PostContainer>
        <Img src={picture} alt="perfil" />

        <span>
          {myUsername === username ? (
            <MyUserDelete>
              <span>{username}</span>
              <div>
                <DeleteIcon onClick={deletePost} />
              </div>
            </MyUserDelete>
          ) : (
            <span>{username}</span>
          )}

          <p>{text}</p>

          <LinkPreview metadaUrl={metadataUrl} />
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

  div {
    cursor: pointer;
  }
`;
