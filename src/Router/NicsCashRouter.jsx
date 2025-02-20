import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import GetData from "../Pages/DashboardPage/GetData";

function NicsCashRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/get" element={<GetData />} />
    </Routes>
  );
}

export default NicsCashRouter;
