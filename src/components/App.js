import GlobalStyles from "../styles/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./home/HomePage";

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/home'
                        element={
                            <>
                                <Header />
                                <Home />
                            </>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
