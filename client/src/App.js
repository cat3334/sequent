import { BrowserRouter, Route, Routes } from "react-router-dom";
import Guide from "./components/Guide";
import Header from "./components/Header";
import MainContent from "./pages/MainContent/MainContent";

import useWebSocket from "react-use-websocket";
const WS_URL = "ws://127.0.0.1:8081";
function App() {
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });
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
