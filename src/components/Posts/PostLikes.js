import { useEffect, useState, React, useContext } from "react";
import { getPostLikes, insertLike, removeUserLike } from "../Service/api";
import OriginalReactTooltip from "react-tooltip";
import styled from "styled-components";
import { HiOutlineHeart } from "react-icons/hi";
import { BsFillHeartFill } from "react-icons/bs";
import UserContext from "../contexts/userContexts";

export default function PostLikes({ post }) {
  const [postLikes, setPostLikes] = useState([]);
  const [text, setText] = useState("");
  const { reload, setReload } = useContext(UserContext);
  const { id, user_id } = post;

  const myUsername = JSON.parse(localStorage.getItem("userLinkr")).username;

  useEffect(() => {
    getPostLikes(id).then((response) => {
      if (response) {
        setPostLikes(response.data);
      }
    });
  }, [reload]);

  const userLike = postLikes.filter((e) => {
    return e.username === myUsername;
  });

  const othersLike = postLikes.filter((e) => {
    return e.username !== myUsername;
  });

  useEffect(() => {
    if (userLike.length === 0 && postLikes.length === 0) {
      setText("Nenhuma curtida");
    }
    if (userLike.length > 0 && postLikes.length === 1) {
      setText("Você e outras 0 pessoas");
    }
    if (userLike.length > 0 && postLikes.length >= 2) {
      setText(
        `Você, ${othersLike[0].username} e outras ${
          postLikes.length - 2
        } pessoas`
      );
    }
    if (userLike.length === 0 && postLikes.length >= 2) {
      setText(
        `${othersLike[1].username}, ${othersLike[0].username} e outras ${
          postLikes.length - 2
        } pessoas`
      );
    }
    if (userLike.length === 0 && postLikes.length === 1) {
      setText(`${postLikes[0].username} e outras 0 pessoas`);
    }
  }, [postLikes]);

  function unlikePost() {
    removeUserLike(id)
      .catch((response) => {
        console.log(response);
      })
      .then(() => {
        setReload(reload + 1);
      });
  }

  function likePost() {
    insertLike(id)
      .catch((response) => {
        console.log(response);
      })
      .then(() => {
        setReload(reload + 1);
      });
  }

  return (
    <LikesContainer>
      {userLike.length > 0 ? (
        <FillHeart onClick={() => unlikePost()} />
      ) : (
        <Heart onClick={() => likePost()} />
      )}

      <div>
        <h4 data-for="getContent" data-tip={text}>
          {postLikes.length} {postLikes.length > 1 ? "likes" : "like"}
        </h4>
        <ReactTooltip
          id="getContent"
          place="bottom"
          type="light"
          delayHide={400}
          effect="solid"
        />
      </div>
    </LikesContainer>
  );
}

const ReactTooltip = styled(OriginalReactTooltip).attrs({
  className: "custom-tooltip",
})`
  &.custom-tooltip {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    min-height: 24px;
    height: fit-content;
    padding: 0;
    width: 169px;
    font-size: 11px;
    font-weight: 700;
    color: #505050;
  }
`;

const LikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > :last-child {
    position: relative;
  }
  && h4 {
    font-size: 11px;
    margin-top: 4px;
    color: var(--heavy-text);
    padding: 0;
  }
`;

const FillHeart = styled(BsFillHeartFill)`
  font-size: 20px;
  color: var(--liked-heart);
  cursor: pointer;
  user-select: none;
  margin-left: 3px;
  margin-top: 3px;
  :hover {
    transition: all 0.1s ease-in;
    filter: brightness(1.4);
  }
  :active {
    transform: translateY(2px);
    transition: all 0.2s ease-in;
  }
`;

const Heart = styled(HiOutlineHeart)`
  font-size: 24px;
  color: var(--heavy-text);
  cursor: pointer;
  user-select: none;
  :hover {
    transition: all 0.1s ease-in;
    filter: brightness(1.4);
  }
  :active {
    transform: translateY(2px);
    transition: all 0.2s ease-in;
  }
`;
