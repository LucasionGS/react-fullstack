import React from "react";
import { Routes, Route } from "react-router-dom";
// Pages
import Index from "./pages/Index";

export function AllRoutes() {
  return (
    <Routes>
      <Route index element={<Index />} />
    </Routes>
  );
}
