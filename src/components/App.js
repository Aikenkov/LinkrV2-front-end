import GlobalStyles from "../styles/GlobalStyles";

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
