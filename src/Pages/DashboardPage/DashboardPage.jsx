import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { MdQrCodeScanner } from "react-icons/md";
import Button from "../CustomPage/Button";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";

function DashboardPage() {
  const [btc, setBtc] = useState(0.00020150);
  const [currentBtcRate, setCurrentBtcRate] = useState(null);
  const [afterCommissionBtcRate, setAfterCommissionBtcRate] = useState(null);
  const [commissionRate, setCommissionRate] = useState(null);

  useEffect(() => {
    const fetchBtcRate = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
        );
        const data = await response.json();
        const btcRate = data.bitcoin.inr;

        // Save the rate to local storage with a timestamp
        const newData = { btcRate, timestamp: Date.now() };
        localStorage.setItem("btcRateData", JSON.stringify(newData));

        setCurrentBtcRate(btcRate);
      } catch (error) {
        console.error("Error fetching BTC rate:", error);
      }
    };

    const checkAndUpdateBtcRate = () => {
      const storedData = localStorage.getItem("btcRateData");
      if (storedData) {
        const { btcRate, timestamp } = JSON.parse(storedData);

        // Check if the data is less than 10 minutes old
        if (Date.now() - timestamp < 10 * 60 * 1000) {
          setCurrentBtcRate(btcRate);
          return;
        }
      }

      // Fetch new data if not found or outdated
      fetchBtcRate();
    };

    checkAndUpdateBtcRate();

    // Set interval to update BTC rate every 10 minutes
    const interval = setInterval(() => {
      fetchBtcRate();
      window.location.reload(); // Refresh page after 10 min
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentBtcRate !== null) {
      const btcInr = btc * currentBtcRate;
      const commissionRate1 = btcInr * 0.15;
      setCommissionRate(commissionRate1);
      const total = btcInr - commissionRate1;
      setAfterCommissionBtcRate(total);
      localStorage.setItem("totalBalence", total);
    }
  }, [currentBtcRate]);

  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <FaBell className="text-gray-400 text-xl" />
          <MdQrCodeScanner className="text-primaryColor text-xl" />
        </div>
      </div>

      {/* Wallet Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <h2 className="text-xs text-gray-400 mb-5">Total Assets</h2>
        <div className="flex items-end">
          <p className="text-3xl font-bold">
            ₹ {afterCommissionBtcRate?.toFixed(2)}
          </p>
        </div>
        <p className="text-gray-500">{btc} BTC</p>
        <div className="flex gap-3 mt-4">
          <Button
            hasIcon
            label="Scan"
            className="text-xs text-primaryColor border-primaryColor"
          >
            <MdQrCodeScanner className="text-primaryColor" />
          </Button>

          <Button
            hasIcon
            label="Withdraw"
            className="text-xs text-primaryColor border-primaryColor"
          >
            <PiHandDeposit className="text-primaryColor" />
          </Button>

          <Button
            hasIcon
            label="Deposit"
            className="text-xs text-primaryColor border-primaryColor"
          >
            <PiHandWithdraw className="text-primaryColor" />
          </Button>
        </div>
      </div>

      {/* Balance Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <p className="text-xs text-gray-400 ">Balance</p>
        <div className="flex flex-col gap-5 mt-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <IoWalletOutline className="border border-primaryColor p-1.5 rounded-full text-3xl bg-[#f9debc] text-primaryColor" />
              <p> Available Balance</p>
            </div>
            <div className="text-end">
              <p className="font-bold">INR 0.00</p>
              <p className="text-gray-500 text-xs">0.00000000 BTC</p>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <IoWalletOutline
                className={`border border-primaryColor p-1.5 rounded-full text-3xl`}
              />
              <p className=""> Pending Balance</p>
            </div>
            <div className="text-end">
              <p className=" font-bold">INR 0.00</p>
              <p className="text-gray-500 text-xs">0.00000000 BTC</p>
            </div>
          </div>
        </div>
      </div>

      {/* BTC Rate Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <h2 className="text-xs text-gray-400 mb-5">BTC Rate</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Current BTC Rate</p>
            <p>
              {currentBtcRate !== null ? (
                <span>₹ {currentBtcRate.toFixed(2)}</span>
              ) : (
                <span>Loading BTC rate...</span>
              )}
            </p>
          </div>
          <div className="flex justify-between">
            <p>After Commission BTC Rate (15%)</p>
            <p>₹ {commissionRate?.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Miner Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <p className="text-xs text-gray-400">Miners</p>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex justify-between items-center ">
            <p className=""> Online </p>
            <p className="">1</p>
          </div>
          <div className="flex justify-between items-center ">
            <p className=""> Offline </p>
            <p className="">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
