import { useEffect, useState, React, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import ReloadNewPosts from "./ReloadNewPosts";
import styled from "styled-components";
import UserContext from "../contexts/userContexts";
import { getFollows, getAllPosts } from "../Service/api";
import LoadingIcon from "../common/TailSpin";
import useInterval from "use-interval";

export default function Posts({ func, param }) {
  const [post, setPost] = useState([]);
  const [allPosts, setAllPosts] = useState(0);
  const { reload, setReload } = useContext(UserContext);
  const [follows, setFollows] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(
    <ThreeDots color={"#B7B7B7"} height={70} width={50} />
  );

  useInterval(() => {
    if (window.scrollY === 0) {
      setHasMorePosts(true);
    }
  }, 5000);

  useEffect(() => {
    param = param ? param : 0;
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
          setHasMorePosts(false);
        }

        if (response.data.length < 10) {
          setHasMorePosts(false);
        }
      });
    getFollows().then((p) => setFollows(p.data));
  }, [reload]);

  useEffect(() => {
    getAllPosts()
      .catch((response) => console.log(response))
      .then((response) => {
        setAllPosts(response.data.length);
      });
  }, [reload]);

  function verifyNoPost() {
    if (follows.length === 0) {
      return "You don't follow anyone yet. Search for new friends!";
    }
    if (follows.length !== 0) {
      return "No posts found from your friends!";
    }
  }

  function loadMorePosts() {
    func(page)
      .catch((response) => {
        console.log(response);
      })
      .then((response) => {
        if (response.data.length < 10) {
          setHasMorePosts(false);
        }

        setPost([...post, ...response.data]);
      });
  }

  return post.length === 0 ? (
    <NoPosts>{verifyNoPost()}</NoPosts>
  ) : (
    <Wrapper>
      <ReloadNewPosts postsLength={allPosts} />

      <InfiniteScroll
        dataLength={post.length}
        next={loadMorePosts}
        hasMore={hasMorePosts}
        loader={
          <Loading key={0}>
            <LoadingIcon />
            Loading more posts...
          </Loading>
        }
      >
        {post.map((posts, index) => (
          <Post key={index} post={posts} />
        ))}
      </InfiniteScroll>
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
`;

const Loading = styled.h5`
  text-align: center;
  color: #6d6d6d;
  font-size: 22px;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;

  h6 {
    margin-top: -10px;
  }
`;
