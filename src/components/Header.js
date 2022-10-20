import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {

    const [logout, setLogout] = useState(true);
    const [icon, setIcon] = useState('chevron-down-outline')
    const navigate = useNavigate();

    function toggleLogOut(resposta){
        if(resposta === 'logged'){
            setLogout(false);
            setIcon("chevron-up-outline")
        }
        if(resposta!=='logged'){
            setIcon('chevron-down-outline')
            setLogout(true);
        }

    }
    function logoutUser (){
        localStorage.removeItem('userLinkr');
        navigate('/');

    }
    return (
        <>      
        {
            logout === true ?
            <Wrapper>
            <h1>linkr</h1>
            <UserLogOUt>
                <ion-icon onClick={()=> toggleLogOut('logged')} name={icon}></ion-icon>
                <img onClick={()=> toggleLogOut('logged')} src='https://i.pinimg.com/736x/f8/f3/01/f8f301698392ee89abd583fe98c83a54.jpg' />
            </UserLogOUt>
          
        </Wrapper>
        :
        <>
            <Wrapper>
                <h1>linkr</h1>
                <UserLogOUt>
                    <ion-icon onClick={()=> toggleLogOut('g')} name={icon}></ion-icon>
                    <img onClick={()=> toggleLogOut('g')} src='https://i.pinimg.com/736x/f8/f3/01/f8f301698392ee89abd583fe98c83a54.jpg' />
                </UserLogOUt>
            
            </Wrapper>
            <LogOuyUser>
                   <p onClick={logoutUser}>Logout</p>   
            </LogOuyUser>
        </>
        }
         
        </>

    );
}

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    justify-content: space-between;
    background-color: var(--heavy-background);
    width: 100vw;
    height: 72px;
    padding: 10px 0;
    ion-icon{
        color:#FFFF;
        font-size:25px ;
    }
    img {
        width: 53px;
        height: 53px;
        border-radius: 50%;
        margin-right: 17px;
    }

    h1 {
        margin-left: 28px;
        font-family: "Passion One", cursive;
        color: var(--heavy-text);
        font-size: 49px;
        font-weight: 700;
    }
`;
const UserLogOUt = styled.div`
    ion-icon{
        color:#FFFF;
        font-size:27px ;
        margin-right:8px ;
        margin-bottom:10px ;
    }
`
const LogOuyUser = styled.div`
margin-top: 72px ;
    width: 150px;
    background-color:#151515 ;
    position:fixed;
    top:0;
    right:0 ;
    border-radius:0 0 0 20px ;
    height:47px ;
    display:flex;
    align-items:center ;
    justify-content:center ;
    color: #FFFF;
    font-family: 'Lato';
    font-size: 17px;
    font-weight: 700;
    text-align: left;

`