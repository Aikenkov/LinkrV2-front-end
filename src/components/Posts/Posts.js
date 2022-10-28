import { useEffect, useState, React, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import Post from "./Post";
import styled from "styled-components";
import UserContext from "../contexts/userContexts";
import { getFollows } from "../Service/api";

export default function Posts({ func, param }) {
  const [post, setPost] = useState([]);
  const { reload, setReload } = useContext(UserContext);
  const [follows, setFollows] = useState([]);
  const [message, setMessage] = useState(
    <ThreeDots color={"#B7B7B7"} height={70} width={50} />
  );

  useEffect(() => {
    param = param ? param : "";
    func(param)
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
      getFollows().then(p => setFollows(p.data));
  }, [reload]);
  
  function verifyNoPost(){
    if(follows.length === 0){
      return "You don't follow anyone yet. Search for new friends!"
    }
    if(follows.length !== 0){
      return "No posts found from your friends!"
    }
  }

  return post.length === 0 ? (
    <NoPosts>{verifyNoPost()}</NoPosts>
  ) : (
    <Wrapper>
      {post.map((posts) => (
        <Post key={posts.id} post={posts}  />
      ))}
    </Wrapper>
  );
}

const NoPosts = styled.h2`
  color: #b7b7b7;
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

  span {
    font-size: 19px;
  }

  p {
    font-size: 17px;
    color: #b7b7b7;
    margin-top: 7px;
  }

  @media (max-width: 767px) {
    //width: 100%;
  }
`;
