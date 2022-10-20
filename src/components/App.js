import GlobalStyles from "../styles/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage";
import UserPosts from "./UserPosts";

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/user/:id' element={ <UserPosts />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
