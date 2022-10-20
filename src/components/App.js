import GlobalStyles from "../styles/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage";
import Timeline from "./Timeline/Timeline";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/timeline" element={<Timeline />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
