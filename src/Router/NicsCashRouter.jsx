import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import GetData from "../Pages/DashboardPage/GetData";
import LoginPage from "../Pages/LoginPage/LoginPage";

function NicsCashRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/get" element={<GetData />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default NicsCashRouter;
