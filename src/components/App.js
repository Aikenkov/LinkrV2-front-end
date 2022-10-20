import GlobalStyles from "../styles/GlobalStyles";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import SignUp from "./Signup/Signup.js";
import SignIn from "./Signin/Signin";
import { useState } from "react";
import UserContext from "./contexts/userContexts";
import Header from "./Header";
import UserPosts from "./UserPosts/UserPosts";
import PrivateRoute from "./PrivateRoute";
import Home from "./home/HomePage";

function App() {
  const location = useLocation();
  const localStorageUser = JSON.parse(localStorage.getItem("userLinkr"));
  const [loggedUser, setLoggedUser] = useState(localStorageUser);

  const [users, setUsers] = useState();
  return (
    <>
      <UserContext.Provider value={{ users, setUsers, setLoggedUser }}>
        <GlobalStyles />
        <Routes location={location} key={location.pathname}>
          <Route
            path='/home'
            element={<PrivateRoute>
                      <Home/>
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
          <Route path='/user/:id' element={<PrivateRoute>
                                            <UserPosts />
                                          </PrivateRoute>}>
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
