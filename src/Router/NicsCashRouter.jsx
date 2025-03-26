import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import GetData from "../Pages/DashboardPage/GetData";
import LoginPage from "../Pages/LoginPage/LoginPage";

function NicsCashRouter() {
   const navigate = useNavigate();
  const userName = localStorage.getItem("user_name");
  // console.log("userName", userName);
  

  useEffect(() => {
    if (!userName) {
      navigate("/"); // Redirect to login if userName is null or undefined
    }
  }, [userName, navigate]);
  return userName ? (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/get" element={<GetData />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default NicsCashRouter;
