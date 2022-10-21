import { useEffect, useState, React, useContext } from "react";
import { getPostLikes, insertLike, removeUserLike } from "../Service/api";
import styled from "styled-components";
import { HiOutlineHeart } from "react-icons/hi";
import { BsFillHeartFill } from "react-icons/bs";
import UserContext from "../contexts/userContexts";

export default function PostLikes({ post }) {
    const [postLikes, setPostLikes] = useState([]);
    const { reload, setReload } = useContext(UserContext);
    const { username, id, user_id } = post;
    let firstsLikes = [];

    useEffect(() => {
        getPostLikes(id)
            .catch((response) => {
                console.log(response);
            })
            .then((response) => {
                setPostLikes(response.data);
            });
    }, [reload]);

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

    const userlike = postLikes.filter((e) => {
        return e.user_id === user_id;
    });

    /* if (postLikes.length > 0) {
          if (postLikes.length === 1 && userlike.length > 0) {
              firstsLikes.push("Você");
          } else if (postLikes.length === 1) {
              firstsLikes.push(postLikes[0].username);
          } else {
              for (let i = 0; i < 2; i++) {
                  if (userlike.length > 0 && i === 0) {
                      firstsLikes.push("Você");
                  }

                  if (
                      postLikes[i].username !== username &&
                      firstsLikes.length < 2
                  ) {
                      firstsLikes.push(postLikes[i].username);
                  }
              }
          }
      }
 */

    console.log(firstsLikes);

    return (
        <LikesContainer>
            {userlike.length > 0 ? (
                <FillHeart onClick={() => unlikePost()} />
            ) : (
                <Heart onClick={() => likePost()} />
            )}

            <div>
                <p>{postLikes.length} likes</p>
                <LikesMessage>
                    <span>João, Maria a e outras 11 pessoas</span>
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

    && p {
        font-size: 11px;
        margin-top: 4px;
        color: var(--heavy-text);
    }

    && p:hover ~ div {
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
