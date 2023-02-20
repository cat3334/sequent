import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./styles/helpers.scss";
import "./styles/variables.scss";
import App from "./App";
import { UserProvider } from "./store/userContex";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
