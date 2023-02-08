import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/MainContent/Board";
import Guide from "./components/Guide";
import Header from "./components/Header";
import MainContent from "./pages/MainContent/MainContent";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Guide />} />
        <Route path="/board" element={<MainContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
