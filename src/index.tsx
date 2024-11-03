// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import ChartPage from "./ChartPage";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/chart/:days" element={<ChartPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
