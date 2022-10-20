import GlobalStyles from "../styles/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage";
import Header from "./Header";

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/home' element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
