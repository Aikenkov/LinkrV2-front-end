import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Posts from "../Posts/Posts";
import styled from "styled-components";
import Trending from "../trending/Trending";
import { getUser, getUserPosts, postFollow, deleteFollow, getFollowing } from "../Service/api";

export default function UserPosts() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [idSeguido, setIdSeguido] = useState();
    const [followingUser, setFollowingUser] = useState(false)
    
    useEffect(() => {
        const userPromisse = getUser(id);
        userPromisse.then((p) => setUser({ ...p.data }));
        userPromisse.catch((p) => {
            alert("Este usuario não existe");
            navigate("/home");
        });
        const postsPromisse = getUserPosts(id);
        postsPromisse.then((p) => setPosts([...p.data]));

        getFollowing(id)
        .then((response)=>{
            if(response.data.length === 0){
                setFollowingUser(false)
            }else{
                setFollowingUser(true)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }, []);




    function following(res){
        if(res === 'follow'){
            const body = {
                id:parseInt(id)
            };

            postFollow(body)
                .then(() => {
                    setFollowingUser(true)
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        if(res === 'unfollow'){
            const body = {
                id:parseInt(id)
             };
            deleteFollow(body)
                .then(()=>{
                    setFollowingUser(false);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

  
   

    return (
        <Wrapper>
            <Page>
                <Title>
                    <img src={user?.picture} />
                    <h1>{user?.username}'s posts </h1>
                </Title>
                <Posts func={getUserPosts} param={id} />
            </Page>
            <Content>
                {
                    followingUser  ?
                        <Unfollow onClick={()=>{following('unfollow')}}>
                            Unfollow
                        </Unfollow>
                    :
                        <Follow onClick={()=>{following('follow')}}>
                            Follow
                         </Follow>
                }
                <Trending />
            </Content>  
        </Wrapper>
    );
}
const Content = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    position:relative ;
`
const Follow = styled.div`
    width: 40%;
    height: 40px;
    display:flex;
    align-items:center ;
    justify-content: center ;
    position: absolute ;
    top:135px;
    right:25px;
    background-color:#1877F2;
    border-radius:5px;

    font-family: Lato;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #FFFF;
    cursor:pointer ;

`
const Unfollow = styled.div`
        width: 40%;
    height: 40px;
    display:flex;
    align-items:center ;
    justify-content: center ;
    position: absolute ;
    top:135px;
    right:25px;
    background-color:#FFFF;
    border-radius:5px;

    font-family: Lato;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #1877F2;
    cursor:pointer ;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        justify-content:inherit;
      }
`;

const Page = styled.div`
    width: 40vw;
    max-width: 611px;
    margin-right: 25px;
    margin-top: 125px;

    @media only screen and (max-width: 767px) {
        margin-right: 0;
    }

    @media only screen and (max-width: 767px) {
        margin-right: 0;
        width: inherit;
    }
`;

const Title = styled.div`
    display: flex;
    img {
        width: 53px;
        height: 53px;
        border-radius: 50%;
        margin-right: 17px;
        object-fit: cover;
    }
    h1 {
        font-family: "Oswald", sans-serif;
        font-size: 43px;
        font-weight: 700;
        color: var(--heavy-text);
        margin-bottom: 28px;
    }
    @media (max-width: 768px) {
        margin-left:17px;
    }
`;
