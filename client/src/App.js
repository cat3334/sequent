import { BrowserRouter, Route, Routes } from "react-router-dom";
import Guide from "./pages/Introduction/Guide";
import Header from "./components/Header";
import MainContent from "./pages/MainContent/MainContent";
import { useContext, useEffect } from "react";
import { UserContext } from "./store/userContex";

function App() {
  const { userDispatch } = useContext(UserContext);

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
        console.log(data);
        userDispatch({
          type: "login",
          payload: { user_id: data.user_id, user_name: data.user_name },
        });
      } catch (e) {
        alert(e);
      }
    };
    getData();
  }, [userDispatch]);

  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Guide />} />
        <Route path="/board/:id" element={<MainContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
