import React, { useState } from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { IoHammer, IoHome, IoWallet } from "react-icons/io5";
import ProfilePage from "../ProfilePage/ProfilePage";
import DashboardPage from "../DashboardPage/DashboardPage";
import SettingsPage from "../SettingsPage/SettingsPage";
import OrderPage from "../OrderPage/OrderPage";
import WalletPage from "../WalletPage/WalletPage";

function HomePage() {
  const [tabName, setTabName] = useState("dashboard");

  return (
    <>
      <div className="fixed bottom-0 w-full bg-slate-900 flex justify-around items-center py-4  pb-5 text-2xl">
        <IoHome
          onClick={() => setTabName("dashboard")}
          className={`${
            tabName === "dashboard" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <IoHammer
          onClick={() => setTabName("settings")}
          className={`${
            tabName === "settings" ? "text-yellow-500" : "text-gray-400"
          }`}
        />

        <FaShoppingCart
          onClick={() => setTabName("order")}
          className={`${
            tabName === "order" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <IoWallet
          onClick={() => setTabName("wallet")}
          className={`${
            tabName === "wallet" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <FaUserCircle
          onClick={() => setTabName("profile")}
          className={`${
            tabName === "profile" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
      </div>
      {tabName === "dashboard" && <DashboardPage />}
      {tabName === "settings" && <SettingsPage />}
      {tabName === "order" && <OrderPage />}
      {tabName === "wallet" && <WalletPage />}
      {tabName === "profile" && <ProfilePage />}
    </>
  );
}

export default HomePage;
