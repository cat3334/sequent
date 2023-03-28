import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./styles/variables.scss";
import App from "./App";
import { UserProvider } from "./store/userContex";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
);
