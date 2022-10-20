import GlobalStyles from "../styles/GlobalStyles";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./HomePage";
import SignUp from "./Signup/Signup.js";
import SignIn from "./Signin/Signin";
import { useState } from "react";
import UserContext from "./contexts/userContexts";
import Timeline from "./timeline/Timeline";

function App() {
    const location = useLocation();
    const localStorageUser = JSON.parse(localStorage.getItem('userLinkr')); 
    const [loggedUser, setLoggedUser] = useState(localStorageUser)

    const [users, setUsers] = useState();
    return (
        <>
        <UserContext.Provider value={{ users, setUsers}}>
            <GlobalStyles />
         
                <Routes location={location} key={location.pathname}>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path="/sign-up/" element={<SignUp />} />
                    <Route path="/" element={loggedUser ?  <Navigate replace to={'/timeline'}/> : <SignIn/> }/>
                    <Route path="/timeline" element ={loggedUser ? <Timeline/> : <Navigate replace to={'/'}/>}/>
                </Routes>
           
        </UserContext.Provider>
        </>
    );
}

export default App;
