import { useEffect, useState, React, useContext } from "react";
import { getPostLikes, insertLike, removeUserLike } from "../Service/api";
import styled from "styled-components";
import { HiOutlineHeart } from "react-icons/hi";
import { BsFillHeartFill } from "react-icons/bs";
import UserContext from "../contexts/userContexts";

export default function PostLikes({ post }) {
  const [postLikes, setPostLikes] = useState([]);
  const [text, setText] = useState("");
  // const [userLike, setUserLike] = useState([]);
  //  const [othersLike, setOthersLike] = useState([]); */
  const { reload, setReload } = useContext(UserContext);
  const { username, id, user_id } = post;

  const myUsername = JSON.parse(localStorage.getItem("userLinkr")).username;

  useEffect(() => {
    getPostLikes(id)
      .catch((response) => {
        console.log(response);
      })
      .then(async (response) => {
        setPostLikes(response.data);
      });
  }, [postLikes]);

  const userLike = postLikes.filter((e) => {
    return e.username === myUsername;
  });

  /* useEffect(() => {
        postLikes.filter((e) => {
            if (e.user_id === user_id) {
                setUserLike(e);
            }
        });
    }, [postLikes]); */

  const othersLike = postLikes.filter((e) => {
    return e.user_id !== user_id;
  });

  useEffect(() => {
    if (userLike.length === 0 && postLikes.length === 0) {
      setText("Nenhuma curtida");
    }
    if (userLike.length > 0 && postLikes.length === 1) {
      setText("Você e outras 0 pessoas");
    }
    if (userLike.length > 0 && postLikes.length === 2) {
      setText(`Você, ${othersLike[0].username} e outras 0 pessoas`);
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
        <h4>
          {postLikes.length} {postLikes.length > 1 ? "likes" : "like"}
        </h4>
        <LikesMessage>
          <span>{text}</span>
        </LikesMessage>
      </div>
    </LikesContainer>
  );
}

const LikesMessage = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -42px;
  left: -76px;
  width: 182px;
  min-height: 24px;
  padding: 0 5px 5px 8px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.9);
  && span {
    font-size: 11px;
    font-weight: 700;
    margin-top: 3px;
    color: var(--likes-text);
  }
  &:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 7px solid rgba(255, 255, 255, 0.9);
    top: -6px;
    left: 47%;
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
  && h4:hover ~ div {
    display: flex;
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
