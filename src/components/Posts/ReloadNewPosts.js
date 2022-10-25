import { useState, useContext } from "react";
import { getTimeline } from "../Service/api";
import UserContext from "../contexts/userContexts";
import Reload from "../../assets/reloadVector.svg";
import useInterval from "use-interval";
import styled from "styled-components";

export default function ReloadNewPosts({ postsLength }) {
  const [numberNewPosts, setNumberNewPosts] = useState(0);
  const { reload, setReload } = useContext(UserContext);

  useInterval(() => {
    getTimeline()
      .catch((response) => console.log(response))
      .then((response) => {
        if (postsLength < response.data.length) {
          setNumberNewPosts(response.data.length - postsLength);
        } else if (postsLength > response.data.length) {
          setReload(!reload);
        }
      });
  }, 15000);

  return numberNewPosts === 0 ? (
    <></>
  ) : (
    <ButtonNewPosts
      onClick={() => {
        setReload(!reload);
        setNumberNewPosts(0);
      }}
    >
      <h2>
        {numberNewPosts} new {numberNewPosts === 1 ? "post" : "posts"}, load
        more!
      </h2>
      <img src={Reload} alt="reload" />
    </ButtonNewPosts>
  );
}

const ButtonNewPosts = styled.button`
  width: 100%;
  height: 61px;
  background-color: #1877f2;
  border-radius: 16px;
  border: none;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  cursor: pointer;

  h2 {
    font-weight: 400;
    font-size: 16px;
    margin-right: 14px;
  }

  @media (max-width: 767px) {
    border-radius: 0px;
    margin-top: 15px;
  }
`;
