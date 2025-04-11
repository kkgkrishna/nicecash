import React, { useEffect, useState } from "react";
import { FaBell, FaPowerOff } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { MdQrCodeScanner } from "react-icons/md";
import Button from "../CustomPage/Button";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { ApiConstant } from "../../ApiConstant/ApiConstant";
import CustomLoader from "../CustomPage/CustomLoader";

function DashboardPage2({ setF2PoolAllData }) {
  const navigate = useNavigate();
  const [totalBtc, setTotalBtc] = useState(null);
  const [currentBtcRate, setCurrentBtcRate] = useState(7517663);
  const [afterCommissionBtcRate, setAfterCommissionBtcRate] = useState(null);
  const [commissionRate, setCommissionRate] = useState(null);
  const [f2poolData, setF2poolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_name = localStorage.getItem("user_name");
    setApiKey(token);
    setUserName(user_name);
  }, []);

  const handleLogout = () => {
    console.log("Logout Call");
    localStorage.clear();
    navigate("/login");
  };

  const fetchBtcRate = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
      );
      const data = await response.json();
      const btcRate = data.bitcoin.inr;

      // Save to local storage with timestamp
      const newData = { btcRate, timestamp: Date.now() };
      localStorage.setItem("btcRateData", JSON.stringify(newData));

      // setCurrentBtcRate(btcRate);
      setCurrentBtcRate(7517663);
    } catch (error) {
      console.error("Error fetching BTC rate:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${ApiConstant?.f2POOL_BASE_URL}/${userName}/${apiKey}`
      );
      setLoading(true);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setF2poolData(result);
      // console.log("API Data:", result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkAndFetchData = () => {
    const storedBtcData = localStorage.getItem("btcRateData");
    const lastFetchTime = storedBtcData
      ? JSON.parse(storedBtcData).timestamp
      : 0;

    if (Date.now() - lastFetchTime >= 10 * 60 * 1000) {
      fetchBtcRate();
    } else {
      // If less than 10 min, use stored BTC rate
      const btcRate = storedBtcData ? JSON.parse(storedBtcData).btcRate : null;
      if (btcRate) setCurrentBtcRate(btcRate);
    }
  };

  useEffect(() => {
    checkAndFetchData(); // Initial check on mount

    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      fetchBtcRate();
      fetchData();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (userName && apiKey) {
      fetchData();
    }
  }, [userName && apiKey]);

  // useEffect(() => {
  //   if (f2poolData) {
  //     // console.log(
  //     //   "f2pool data = ",
  //     //   f2poolData?.value + f2poolData?.value_today
  //     // );
  //     setF2PoolAllData(f2poolData);
  //     // console.log("btc", f2poolData?.value, f2poolData?.value_today);
  //     // setTotalBtc(f2poolData?.value + f2poolData?.value_today);
  //     setTotalBtc(0.00179389);
  //   }
  // }, [f2poolData]);

  // useEffect(() => {
  //   if (f2poolData) {
  //     const newValue = 0.0023;
  //     setTotalBtc(newValue);
  //     localStorage.setItem("totalBtc", newValue.toString());
  //   }
  // }, [f2poolData]);
  useEffect(() => {
    const newValue = 0.0023;
    setTotalBtc(newValue);
    localStorage.setItem("totalBtc", newValue.toString());
  }, []);

  useEffect(() => {
    const lastUpdate = localStorage.getItem("lastUpdate");
    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    if (!lastUpdate || currentTime - parseInt(lastUpdate) >= oneHour) {
      // Increase by 0.0000017 only once per hour
      const updatedValue = totalBtc + 0.0000017;
      setTotalBtc(updatedValue);
      localStorage.setItem("totalBtc", updatedValue.toString());
      localStorage.setItem("lastUpdate", currentTime.toString());
    }
  }, [totalBtc]);

  useEffect(() => {
    // console.log("currentBtcRate", totalbtc);
    if (currentBtcRate && totalBtc) {
      const btcInr = totalBtc * currentBtcRate;
      console.log("btc inr", totalBtc);
      const commissionRate1 = btcInr * 0;
      setCommissionRate(commissionRate1);
      const total = btcInr - commissionRate1;
      setAfterCommissionBtcRate(total);
      localStorage.setItem("totalBalance", total);
    }
  }, [currentBtcRate && totalBtc]);

  return (
    <div className="bg-black text-white min-h-screen p-4 text-s">
      {loading && <CustomLoader />}
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <FaBell className="text-gray-400 text-xl" />
          <MdQrCodeScanner className="text-primaryColor text-xl" />
          {/* <FaPowerOff
            className="text-red-500 text-xl"
            onClick={() => handleLogout()}
          /> */}
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
        <p className="text-gray-500">{totalBtc?.toFixed(9)} BTC</p>
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

          {/* <div className="flex justify-between items-center gap-2">
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
          </div> */}
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
          {/* <div className="flex justify-between">
            <p> Commission Rate (15%)</p>
            <p>₹ {commissionRate?.toFixed(2)}</p>
          </div> */}
        </div>
      </div>

      {/* Miner Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-16">
        <p className="text-xs text-gray-400">Miners</p>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex justify-between items-center ">
            <p className=""> Online </p>
            <p className="">2</p>
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

export default DashboardPage2;
