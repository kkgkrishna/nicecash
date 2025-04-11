import React, { useState } from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { IoHome, IoWallet } from "react-icons/io5";
import ProfilePage from "../ProfilePage/ProfilePage";
import SettingsPage from "../SettingsPage/SettingsPage";
import WalletPage from "../WalletPage/WalletPage";
import RevenuePage from "../RevenuePage/RevenuePage";
import DashboardPage2 from "../DashboardPage/DashboardPage";

function HomePage() {
  const [tabName, setTabName] = useState("dashboard");
  const [f2PollAlData, setF2PoolAllData] = useState();
  return (
    <>
      {/* BTC Rate Display */}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-slate-900 flex justify-around items-center py-4 pb-5 text-2xl">
        <IoHome
          onClick={() => setTabName("dashboard")}
          className={`${
            tabName === "dashboard" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        {/* <IoHammer
          onClick={() => setTabName("settings")}
          className={`${
            tabName === "settings" ? "text-yellow-500" : "text-gray-400"
          }`}
        /> */}
        {/* <FaShoppingCart
          onClick={() => setTabName("revenue")}
          className={`${
            tabName === "revenue" ? "text-yellow-500" : "text-gray-400"
          }`}
        /> */}
        {/* <IoWallet
          onClick={() => setTabName("revenue")}
          className={`${
            tabName === "revenue" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <FaUserCircle
          onClick={() => setTabName("profile")}
          className={`${
            tabName === "profile" ? "text-yellow-500" : "text-gray-400"
          }`}
        /> */}
      </div>

      {/* Render Pages Based on Selected Tab */}
      {tabName === "dashboard" && (
        <DashboardPage2 setF2PoolAllData={setF2PoolAllData} />
      )}
      {tabName === "settings" && <SettingsPage />}
      {tabName === "revenue" && <RevenuePage f2PollAlData={f2PollAlData} />}
      {tabName === "wallet" && <WalletPage />}
      {tabName === "profile" && <ProfilePage f2PollAlData={f2PollAlData} />}
    </>
  );
}

export default HomePage;
