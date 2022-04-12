import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AllRoutes } from "./AllRoutes";
import "./App.scss";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.querySelector("app-root"));

root.render(<App />);