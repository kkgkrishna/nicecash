import React, { useEffect, useState } from "react";
import { FaCog, FaPowerOff, FaUserCircle } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { Utils } from "../Utils/Utils";

import { useNavigate } from "react-router-dom";

function RevenuePage({ f2PollAlData }) {
  const navigate = useNavigate();

  const [currentBtcRate, setCurrentBtcRate] = useState();

  const handleLogout = () => {
    console.log("LogOut Call");
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const storedData = localStorage.getItem("btcRateData");
    const parsedData = JSON.parse(storedData);
    console.log("BTC Rate:", parsedData.btcRate);
    setCurrentBtcRate(parsedData.btcRate);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Revenue</h1>
        <div className="flex items-center gap-4">
          <FaCog className="text-gray-400 text-xl" />
          <MdQrCodeScanner className="text-yellow-500 text-xl" />
          <FaPowerOff
            className="text-red-500 text-xl"
            onClick={() => handleLogout()}
          />
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg mb-4 text-white">
        <div className="grid grid-cols-2 gap-6 text-center">
          {/* Total Income */}

          <div className="flex flex-col">
            <p className="text-base mb-2 text-gray-400">Total Income</p>
            <div className="flex flex-col">
              <p className="text-xl font-semibold">
                {
                  Utils?.convertBtcToInr(
                    f2PollAlData?.value + f2PollAlData?.value_today,
                    currentBtcRate,
                    0.15
                  )?.afterFee
                }
              </p>
              <p className="text-sm">
                {f2PollAlData?.value + f2PollAlData?.value_today} BTC
              </p>
            </div>
          </div>

          {/* Total Payout */}
          <div className="flex flex-col">
            <p className="text-base mb-2 text-gray-400">Total Payout</p>
            <div className="flex flex-col">
              <p className="text-xl font-semibold">₹ 0.00</p>
              <p className="text-sm">0.000000 BTC</p>
            </div>
          </div>

          {/* Balance */}
          <div className="flex flex-col">
            <p className="text-base mb-2 text-gray-400">Yesterday Revenue</p>
            <div className="flex flex-col">
              <p className="text-xl font-semibold">
                {
                  Utils?.convertBtcToInr(
                    f2PollAlData?.value_last_day,
                    currentBtcRate,
                    0.15
                  )?.afterFee
                }
              </p>
              <p className="text-sm">{f2PollAlData?.value_last_day} BTC</p>
            </div>
          </div>

          {/* Today's Estimated Revenue */}

          <div className="flex flex-col">
            <p className="text-base mb-2 text-gray-400">Today's Est. Revenue</p>
            <div className="flex flex-col">
              <p className="text-xl font-semibold">
                {
                  Utils?.convertBtcToInr(
                    f2PollAlData?.value_today,
                    currentBtcRate,
                    0.15
                  )?.afterFee
                }
              </p>
              <p className="text-sm">{f2PollAlData?.value_today} BTC</p>
            </div>
          </div>
        </div>

        {/* Withdraw & Deposit Buttons */}
        {/* <div className="flex gap-3 mt-4 justify-center">
          <button className="text-sm text-primaryColor border border-primaryColor px-3 py-1 rounded-md flex items-center gap-2">
            <PiHandWithdraw className="text-primaryColor" /> Withdraw
          </button>

          <button className="text-sm text-primaryColor border border-primaryColor px-3 py-1 rounded-md flex items-center gap-2">
            <PiHandDeposit className="text-primaryColor" /> Deposit
          </button>
        </div> */}
      </div>

      {/* Date wise earning Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-16">
        <h2 className="text-base  text-gray-400 mb-5">Date Wise Earning</h2>
        {f2PollAlData?.payout_history?.map((data, index) => (
          <div
            key={index}
            className={`flex justify-between items-center mt-2  border-gray-700 pb-2 ${
              f2PollAlData?.payout_history?.length - 1 === index
                ? "border-none"
                : "border-b"
            }`}
          >
            <div className="flex flex-col  ">
              {/* <div className="w-4 h-4 bg-green-500 rounded-full"></div> */}
              {/* <span className="text-lg">
                {Utils?.getLast10DaysFromDate(data?.date)?.[0]?.date}
              </span>
              <span className="text-sm">
                ({Utils?.getLast10DaysFromDate(data?.date)?.[0]?.day})
              </span> */}
              <span className="text-lg">
                {Utils?.getLast10DaysFromDate(data?.[0])?.[0]?.date}
              </span>
              <span className="text-sm">
                ({Utils?.getLast10DaysFromDate(data?.[0])?.[0]?.day})
              </span>
            </div>
            <div className="text-end">
              <p className="text-lg">
                {
                  Utils?.convertBtcToInr(data?.[2], currentBtcRate, 0.15)
                    ?.afterFee
                }
              </p>
              <p className="text-sm">{data?.[2]} BTC</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RevenuePage;
