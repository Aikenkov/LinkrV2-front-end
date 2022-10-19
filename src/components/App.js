import GlobalStyles from "../styles/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage";

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path='/home' element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
