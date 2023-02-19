import { BrowserRouter, Route, Routes } from "react-router-dom";
import Guide from "./pages/Introduction/Guide";
import Header from "./components/Header";
import MainContent from "./pages/MainContent/MainContent";
import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8081/users/validate", {
          credentials: "include",
        });
        if (!response.ok) {
          const e = response.json();
          throw new Error(e.message);
        }
        const data = await response.json();
        setUserId(data.user_id);
        console.log(data);
      } catch (e) {
        alert(e);
      }
    };
    getData();
  }, []);

  console.log(userId);

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
