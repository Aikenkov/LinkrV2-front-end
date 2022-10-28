import GlobalStyles from "../styles/GlobalStyles";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SignUp from "./Signup/Signup.js";
import SignIn from "./Signin/Signin";
import { useState } from "react";
import UserContext from "./contexts/userContexts";
import UserPosts from "./UserPosts/UserPosts";
import PrivateRoute from "./PrivateRoute";
import Home from "./home/HomePage";
import HashtagPage from "./trending/HashtagPage";

function App() {
    const location = useLocation();
    const localStorageUser = JSON.parse(localStorage.getItem("userLinkr"));
    const [loggedUser, setLoggedUser] = useState(localStorageUser);
    const [reload, setReload] = useState(0);
    const [following, setFollowing] = useState([]);

    const [users, setUsers] = useState();
    return (
        <>
            <UserContext.Provider
                value={{
                    users,
                    setUsers,
                    setLoggedUser,
                    reload,
                    setReload,
                    following,
                    setFollowing,
                }}
            >
                <GlobalStyles />
                <Routes location={location} key={location.pathname}>
                    <Route
                        path='/home'
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/sign-up/' element={<SignUp />} />
                    <Route
                        path='/'
                        element={
                            loggedUser ? (
                                <Navigate replace to={"/home"} />
                            ) : (
                                <SignIn />
                            )
                        }
                    />
                    <Route
                        path='/user/:id'
                        element={
                            <PrivateRoute>
                                <UserPosts />
                            </PrivateRoute>
                        }
                    ></Route>
                    <Route
                        path='/hashtag/:hashtag'
                        element={
                            <PrivateRoute>
                                <HashtagPage />
                            </PrivateRoute>
                        }
                    ></Route>
                </Routes>
            </UserContext.Provider>
        </>
    );
}

export default App;
