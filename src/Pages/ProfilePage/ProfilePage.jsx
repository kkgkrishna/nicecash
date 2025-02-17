import React, { useState } from "react";
import { FaUserCircle, FaCog } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "../CustomPage/Button";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";

function ProfilePage() {
  const [showBalance, setShowBalance] = useState(true);
  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex items-center gap-4">
          <FaCog className="text-gray-400 text-xl" />
          <MdQrCodeScanner className="text-yellow-500 text-xl" />
        </div>
      </div>

      {/* Wallet Info */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-yellow-500 text-3xl" />
          <h2 className="text-lg font-semibold">KRISHNA KUMAR GAUTAM</h2>
        </div>
        <div className="flex items-center justify-between gap-5 mt-2 ">
          <p className="text-3xl font-semibold">
            {showBalance ? "₹0.00" : "₹*****"}
          </p>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-xl"
          >
            {showBalance ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <p className="text-gray-500">0.00000000 BTC</p>
        <div className="flex gap-3 mt-4">
          <Button
            hasIcon
            label={`Withdraw`}
            className={`text-xs text-primaryColor border-primaryColor `}
          >
            <PiHandDeposit className={`text-primaryColor `} />
          </Button>

          <Button
            hasIcon
            label={`Deposit`}
            className={`text-xs text-primaryColor border-primaryColor `}
          >
            <PiHandWithdraw className={`text-primaryColor `} />
          </Button>
        </div>
      </div>

      {/* Holdings Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-16">
        <h2 className="text-sm text-gray-400">Holdings</h2>
        <div className="flex justify-between items-center mt-2 border-b border-gray-700 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span>Available Balance</span>
          </div>
          <div className="text-end">
            <p className="text-sm">₹0.00</p>
            <p className="text-xsm">0.00000000 BTC</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span>Pending & In Orders</span>
          </div>
          <div className="text-end">
            <p className="text-sm">₹0.00</p>
            <p className="text-xsm">0.00000000 BTC</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
