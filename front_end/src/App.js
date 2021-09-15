import logo from "./logo.svg";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
