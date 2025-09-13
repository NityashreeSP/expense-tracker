import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/GlobalStyle.js"; // optional: your global CSS file

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);