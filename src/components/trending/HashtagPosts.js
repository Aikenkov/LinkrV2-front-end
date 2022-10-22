import { useEffect, useState, React, useContext } from "react";
import { getHashtagPost, getTimeline } from "../Service/api";
import { ThreeDots } from "react-loader-spinner";
import Post from "../Posts/Post";
import styled from "styled-components";
import UserContext from "../contexts/userContexts";

export default function HashtagPosts() {
  const [post, setPost] = useState([]);
  const { reload, setReload } = useContext(UserContext);
  const [message, setMessage] = useState(
    <ThreeDots color={"#B7B7B7"} height={70} width={50} />
  );

  useEffect(() => {
    getHashtagPost()
      .catch(() => {
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page!"
        );
      })
      .then((response) => {
        setPost(response.data);

        if (response.data.length === 0) {
          setMessage("There are no posts yet");
        }
      });
  }, [reload]);

  return post.length === 0 ? (
    <NoPosts>{message}</NoPosts>
  ) : (
    <Wrapper>
      {post.map((posts) => (
        <Post key={posts.id} post={posts} />
      ))}
    </Wrapper>
  );
}

const NoPosts = styled.h2`
  color: #b7b7b7;
  font-family: Lato;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-weight: 400;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: Lato;

  span {
    font-size: 19px;
  }

  p {
    font-size: 17px;
    color: #b7b7b7;
    margin-top: 7px;
  }
`;