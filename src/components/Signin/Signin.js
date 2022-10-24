import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postSignIn } from "../Service/api";
import UserContext from "../contexts/userContexts";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { users, setUsers, setLoggedUser } = useContext(UserContext);
    const [isloading, setIsLoading] = useState(false);
    console.log("comecei ");

    function confirmLogin(e) {
        e.preventDefault();
        setIsLoading(true);

        const body = {
            email: email,
            password: password,
        };

        postSignIn(body)
            .then((response) => {
                setUsers(response.data);
                const serializedUser = JSON.stringify(response.data);
                localStorage.setItem("userLinkr", serializedUser);
                setLoggedUser(response.data);

                toast.success("Tudo certo!! :)");
                setTimeout(() => {
                    console.log("entrei no setTimeout");
                    navigate("/home");
                }, 2000);
            })
            .catch((err) => {
                setIsLoading(false);
                console.error(err);
                if (err.status !== 200) {
                    toast.error("Login errado");
                }
            });
        setEmail("");
        setPassword("");
    }

    return (
        <Page>
            <ToastContainer />
            <Logo>
                <TextTittle>linkr</TextTittle>
                <TextSubtitle>
                    save, share and discover the best links on the web
                </TextSubtitle>
            </Logo>

            <FormPage>
                 <Data>
                    <form onSubmit={confirmLogin}>
                            <Input
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                placeholder='email'
                            />
                            <Input
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                placeholder='password'
                            />
                        {isloading ? (
                            <Button disabled={isloading}>
                                {" "}
                                <ThreeDots
                                    color={"white"}
                                    height={30}
                                    width={30}
                                />
                            </Button>
                        ) : (
                            <Button>
                                <p>Log In</p>
                            </Button>
                        )}

                        <Link to='/sign-up'>
                            <TextSignup>
                                First time? Created an account!
                            </TextSignup>
                        </Link>
                        </form>
                    </Data>
            </FormPage>
        </Page>
    );
}
const Logo = styled.div`
    background-color: #151515;
    width: 70%;
    height: 100%;
    display: flex;
    padding-left: 120px;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
    @media (max-width: 768px) {
        box-sizing: border-box;
        padding: 10px 17% 27px 17%;
        width:100% ;
        height:200px ;
        margin-bottom:10px ;
    }
`;
const Page = styled.div`
    height: 100vh;
    display: flex;
    @media (max-width: 768px) {
        display:flex;
        flex-direction:column;
    }
`;

const FormPage = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #333333;
    height: 100%;
    z-index: 1;
    @media (max-width: 768px) {
       width:100% ;
       justify-content: flex-start;
       margin-top: 35px;
      /*  display:flex;
       align-items:center ; */
    }
`;
const Input = styled.input`
    background: #ffff;
    box-shadow: inset 0 -4px 8px rgba(0, 0, 0, 0.4);
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 45px;
    margin-bottom:12px ;
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

const Data = styled.div`
    width: 85%;
`;
const Button = styled.button`
    background: #1877f2;
    border-radius: 4.63636px;
    width: 100%;
    height: 45px;
    font-family: "Oswald", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    border: none;
    color: #ffff;
    margin-top: 15px;
    box-shadow: 0 -6px 10px rgba(0, 0, 0, 0.4);
    :hover {
        filter: brightness(1.2);
        cursor: pointer;
    }
`;
const TextSignup = styled.div`
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: none;
    margin-top: 25px;
    outline: #0000;
    color: #ffff;
`;
const TextTittle = styled.div`
    font-family: "Passion One", sans-serif;
    font-size: 106px;
    font-weight: 700;
    line-height: 117px;
    letter-spacing: 0.05em;
    text-align: left;
    color: #ffffff;
    width: 80%;
    @media (max-width: 768px) {
        width:100% ;
        font-size: 76px;
        line-height: 84px;
        text-align:center ;
    }
`;
const TextSubtitle = styled.div`
    font-family: "Oswald";
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: left;
    width: 65%;
    @media (max-width: 768px) {
        width:100% ;
        font-size: 23px;
        line-height: 34px;
        text-align:center ;
    }
    color: #ffffff;
`;
