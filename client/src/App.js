import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import Guide from "./components/Guide";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Guide />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
