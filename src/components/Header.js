import { useContext, useState } from "react";
import { useNavigate, Link, redirect } from "react-router-dom";
import styled from "styled-components";
import UserContext from "./contexts/userContexts";
import { getSearchUsers } from "./Service/api";
import {DebounceInput} from 'react-debounce-input';


export default function Header() {
  const [logout, setLogout] = useState(true);
  const [icon, setIcon] = useState("chevron-down-outline");
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(UserContext);
  const image = JSON.parse(localStorage.getItem("userLinkr")).url;


  function toggleLogOut(resposta) {
    if (resposta === "logged") {
      setLogout(false);
      setIcon("chevron-up-outline");
    }
    if (resposta !== "logged") {
      setIcon("chevron-down-outline");
      setLogout(true);
    }
  }

  function logoutUser() {
    localStorage.removeItem("userLinkr");
    setLoggedUser();
    setLogout(true);
    navigate("/");
  }
  return (
    <>
      {logout === true ? (
        <Wrapper>
          <Link to={`/home`}>
            <h1>linkr</h1>
          </Link>
          <Search/>
          <UserLogOUt>
            <ion-icon
              onClick={() => toggleLogOut("logged")}
              name={icon}
            ></ion-icon>
           
            <img onClick={() => toggleLogOut("logged")} src={image} />
          </UserLogOUt>
        </Wrapper>
      ) : (
        <>
          <Wrapper>

            <h1>linkr</h1>
            <Search/>
            <UserLogOUt>
            
              <ion-icon
                onClick={() => toggleLogOut("exit")}
                name={icon}
              ></ion-icon>
              
              <img onClick={() => toggleLogOut("exit")} src={image} />
            </UserLogOUt>
          </Wrapper>
          <LogOutUser>
            <p onClick={logoutUser}>Logout</p>
          </LogOutUser>
          <Overlay onClick={() => toggleLogOut("exit")}/>
        </>
      )}
    </>
  );
}

function Search(){
  const [searchUser, setSearchUser] = useState('');
  const [usersFound, setUsersFound] = useState('');
  console.log(searchUser, '************',usersFound, )
  const navigate = useNavigate();


  function searchForUser(value){
    setSearchUser(value);

    getSearchUsers(value)
      .then((response) => {
        if(response.data.length === 0){
          setUsersFound([{id: 0, username:'Não há usuarios com esse nome', image:'https://i.pinimg.com/originals/7c/95/27/7c95276e5d45d739ea83df851c2ca831.jpg'}])        
        } else{
          setUsersFound(response.data)
        }
      })
      .catch((err) => {
        if (err.status !== 200) {
          console.error(err);
        }
      }
    );
  }
  function redirectUser(user){
      if(user.id !== 0){
        navigate(`/user/${user.id}`)
      }
  }
    return(
    <>
      <TextSearch>
        <form>
            <TextInput>
              <Input
                minLength={3}
                debounceTimeout={300}
                type='text'
                onChange={(e) => searchForUser(e.target.value)}
                value={searchUser}
                placeholder='Search for people '
              />
                {
                  usersFound === '' ?
                    <div/>
                  :
                    <SearchBox>
                      {usersFound.map((user)=>{
                        return(
                          <FoundUser onClick={()=>{redirectUser(user)}}>
                           <img src={user.image}/> {user.username}
                          </FoundUser>
                        )
                      })}
                    </SearchBox>

                } 
              <IconSeacrh>
                <ion-icon name="search-outline"></ion-icon>
              </IconSeacrh>
            </TextInput>
        </form>
      </TextSearch>

      
    </>
  );

}
const TextInput = styled.div`
    margin-bottom: 12px;

  position:relative;
    width: 100%;
    height: 45px;
`;
const Wrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  justify-content: space-between;
  background-color: var(--heavy-background);
  width: 100vw;
  height: 72px;
  padding: 10px 0;
  ion-icon {
    color: #ffff;
    font-size: 25px;
    cursor: pointer;
  }
  img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    margin-right: 17px;
    object-fit: cover;
  }

  h1 {
    margin-left: 28px;
    font-family: "Passion One", cursive;
    color: var(--heavy-text);
    font-size: 49px;
    font-weight: 700;
    cursor: pointer;
  }
`;
const UserLogOUt = styled.div`
  ion-icon {
    color: #ffff;
    font-size: 27px;
    margin-right: 8px;
    margin-bottom: 10px;
  }
`;
const LogOutUser = styled.div`
  margin-top: 72px;
  width: 150px;
  background-color: #151515;
  position: fixed;
  top: 0;
  right: 0;
  z-index:4;
  border-radius: 0 0 0 20px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  font-family: "Lato";
  font-size: 17px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;

`;
const Overlay = styled.div`
  position: fixed;
  bottom:0;
  right:0;
  left:0;
  top:0;
  z-index:3;
`
const TextSearch = styled.div`
  width: 43%;
  height: 45px;
`
const Input = styled(DebounceInput)`
    background: #ffff;
    border: none;
    border-radius: 8px;
    width: 100%;
    height: 45px;
    color: black ;
    outline:none ;
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
`;
const IconSeacrh = styled.div`
    position:absolute;
    top: 10px;
    right: 5px ;
    ion-icon{
      color:#C6C6C6;
    }
`
const SearchBox = styled.div`
  width: 100%;
  background-color: #E7E7E7;
  border-radius:8px;
`
const FoundUser = styled.div`
  width:100%;
  height:80px;
  background-color: #E7E7E7;
  margin-bottom:2px ;
  font-family: Lato;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  display:flex;
  padding-left:5px ;
  align-items:center ;
  border-radius:8px;
  :hover{
    filter:brightness(1.2);
  }

`