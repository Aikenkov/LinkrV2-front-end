import styled from "styled-components";
import NewPost from "./NewPost";
import Posts from "../Posts/Posts";
import { getTimeline, getSearchUsers, getFollowedUser } from "../Service/api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import UserContext from "../contexts/userContexts";

export default function Timeline() {
  return (
    <Content>
      <Search />
      <Wrapper>
        <h1>timeline</h1>
        <NewPost />
        <Posts func={getTimeline} />
      </Wrapper>
    </Content>
  );
}

function Search() {
  const [searchUser, setSearchUser] = useState("");
  const [usersFound, setUsersFound] = useState([]);
  const { following, setFollowing } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    getFollowedUser()
      .then((res) => {
        setFollowing(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function searchForUser(value) {
    setSearchUser(value);

    getSearchUsers(value)
      .then((response) => {
        if (response.data.length === 0) {
          setUsersFound([
            {
              id: 0,
              username: "Não há usuarios com esse nome",
              picture_uri:
                "https://i.pinimg.com/originals/7c/95/27/7c95276e5d45d739ea83df851c2ca831.jpg",
            },
          ]);
        } else {
          setUsersFound(response.data);
        }
      })
      .catch((err) => {
        if (err.status !== 200) {
          console.error(err);
        }
      });
  }
  function redirectUser(user) {
    if (user.id !== 0) {
      navigate(`/user/${user.id}`);
    }
  }
  return (
    <TextSearch>
      <FormStyled>
        <TextInput>
          <Input
            minLength={3}
            debounceTimeout={300}
            type="text"
            onChange={(e) => {
              searchForUser(e.target.value);
            }}
            value={searchUser}
            placeholder="Search for people "
          />
          {searchUser.length === 0 ? (
            <div />
          ) : (
            <SearchBox>
              {usersFound.map((user, i) => {
                return (
                  <FoundUser
                    key={i}
                    onClick={() => {
                      redirectUser(user);
                    }}
                  >
                    <img src={user.picture_uri} /> {user.username}
                  </FoundUser>
                );
              })}
            </SearchBox>
          )}
          <IconSeacrh>
            <ion-icon name="search-outline"></ion-icon>
          </IconSeacrh>
        </TextInput>
      </FormStyled>
    </TextSearch>
  );
}
const FormStyled = styled.form`
  width: 90%;
  @media (min-width: 768px) {
    display: none;
  }
`;
const Content = styled.div`
  width: 100%;
`;
const TextInput = styled.div`
  margin-bottom: 12px;
  position: relative;
  width: 100%;
  height: 45px;
  @media (min-width: 768px) {
    display: none;
  }
`;
const TextSearch = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 45px;
  margin-top: 100px;
  img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    margin-right: 17px;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
const Input = styled(DebounceInput)`
  background: #ffff;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 45px;
  color: black;
  outline: none;
  padding-left: 11px;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  ::placeholder {
    color: #9f9f9f;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
const IconSeacrh = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  ion-icon {
    color: #c6c6c6;
  }
`;
const SearchBox = styled.div`
  width: 100%;
  background-color: #e7e7e7;
  border-radius: 8px;
  @media (min-width: 768px) {
    display: none;
  }
`;
const FoundUser = styled.div`
  width: 100%;
  height: 80px;
  background-color: #e7e7e7;
  margin-bottom: 2px;
  font-family: Lato;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  display: flex;
  padding-left: 5px;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    filter: brightness(1.2);
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  width: 611px;
  margin-right: 25px;
  margin-top: 125px;

  && h1 {
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    margin-left: 17px;
    font-weight: 700;
    color: var(--heavy-text);
  }

  @media only screen and (max-width: 767px) {
    width: 100vw;
    margin-right: 0;
    max-width: 100vw;
    margin-top: 35px;
  }
`;
