import { useEffect, useState, React } from "react";
import styled from "styled-components";
import { postMetadata, getTimeline } from "../../services/linkr";

export default function Timeline() {
  const [post, setPost] = useState([]);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    getTimeline()
      .catch(() => {
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      })
      .then((response) => {
        setPost(response.data);

        if (response.data.length === 0) {
          setMessage("There are no posts yet");
        }
      });
  }, []);

  return post.length === 0 ? (
    <NoPosts>{message}</NoPosts>
  ) : (
    <Wrapper>
      {post.map((posts) => (
        <Time key={posts.id} post={posts} />
      ))}
    </Wrapper>
  );
}

function Time({ post }) {
  const [metadataUrl, setMetadaUrl] = useState([]);
  const { username, picture, text, link } = post;
  const body = { url: link };

  useEffect(() => {
    postMetadata(body)
      .catch((response) => {
        console.log(response);
      })
      .then((response) => {
        setMetadaUrl(response.data);
      });
  }, []);

  return (
    <Wrapper>
      <Post>
        <img src={picture} alt="perfil" />

        <span>
          <span>{username}</span>

          <p>{text}</p>

          <MetadataImg metadaUrl={metadataUrl} />
        </span>
      </Post>
    </Wrapper>
  );
}

function MetadataImg({ metadaUrl }) {
  const { title, description, link, image } = metadaUrl;

  return (
    <MetadataImage href={link} target="_blank">
      <Metadata>
        <h6>{title}</h6>
        <p>{description}</p>

        <h5>{link}</h5>
      </Metadata>
      <img src={image} alt="ola" />
    </MetadataImage>
  );
}

const NoPosts = styled.h2`
  color: #ffffff;
  font-family: Lato;
  font-size: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: Lato;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    margin-right: 18px;
  }

  span {
    font-size: 19px;
  }

  p {
    font-size: 17px;
    color: #b7b7b7;
    margin-top: 7px;
  }
`;

const Post = styled.div`
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

const Metadata = styled.div`
  width: 350px;
  height: 155px;
  border-top: solid 1px #4d4d4d;
  border-left: solid 1px #4d4d4d;
  border-right: 0px;
  border-bottom: solid 1px #4d4d4d;
  border-radius: 11px 0px 0px 11px;
  margin-top: 10px;
  padding: 20px 19px;
  line-height: 19px;

  h6 {
    font-size: 16px;
    color: #cecece;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;
  }

  p {
    font-size: 11px;
    color: #9b9595;
    line-height: 13px;
  }

  h5 {
    font-size: 11px;
    color: #cecece;
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;
  }
`;

const MetadataImage = styled.a`
  display: flex;

  img {
    width: 153px;
    height: 155px;
    border: none;
    border-radius: 0px 11px 11px 0px;
    margin-top: 10px;
  }
`;
