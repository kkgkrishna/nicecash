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
  const [currentBtcRate, setCurrentBtcRate] = useState();
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
      localStorage.setItem(
        "btcRateData",
        JSON.stringify({ btcRate, timestamp: Date.now() })
      );
      setCurrentBtcRate(btcRate);
    } catch (error) {
      console.error("Error fetching BTC rate:", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${ApiConstant?.f2POOL_BASE_URL}/${userName}/${apiKey}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setF2poolData(result);
      setF2PoolAllData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
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
      const btcRate = storedBtcData ? JSON.parse(storedBtcData).btcRate : null;
      if (btcRate) setCurrentBtcRate(btcRate);
    }
  };

  // ✅ BTC +0.000000000643 per second with console log
  useEffect(() => {
    const oneSec = 1000;
    const incrementPerSecond = 0.000000000643;

    let storedBtc = parseFloat(localStorage.getItem("totalBtc"));
    if (isNaN(storedBtc)) {
      storedBtc = 0.0030;
      localStorage.setItem("totalBtc", storedBtc.toString());
    }

    setTotalBtc(storedBtc);
    console.log(
      `[Init ${new Date().toLocaleTimeString()}] totalBtc: ${storedBtc}`
    );

    const interval = setInterval(() => {
      setTotalBtc((prev) => {
        const newVal = parseFloat((prev + incrementPerSecond)?.toFixed(12));
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] Updated totalBtc: ${newVal}`);
        localStorage.setItem("totalBtc", newVal.toString());
        return newVal;
      });
    }, oneSec);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentBtcRate && totalBtc) {
      const btcInr = totalBtc * currentBtcRate;
      const commission = btcInr * 0;
      setCommissionRate(commission);
      const totalInr = btcInr - commission;
      setAfterCommissionBtcRate(totalInr);
      localStorage.setItem("totalBalance", totalInr.toString());
    }
  }, [currentBtcRate, totalBtc]);

  useEffect(() => {
    checkAndFetchData();
    const interval = setInterval(() => {
      fetchBtcRate();
      fetchData();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userName && apiKey) {
      fetchData();
    }
  }, [userName, apiKey]);

  return (
    <div className="bg-black text-white min-h-screen p-4 text-s">
      {loading && <CustomLoader />}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <FaBell className="text-gray-400 text-xl" />
          <MdQrCodeScanner className="text-primaryColor text-xl" />
          <FaPowerOff
            className="text-red-400 text-xl"
            onClick={() => handleLogout()}
          />
        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <h2 className="text-xs text-gray-400 mb-5">Total Assets</h2>
        <div className="flex items-end">
          <p className="text-3xl font-bold">
            ₹ {afterCommissionBtcRate?.toFixed(2)}
          </p>
        </div>
        <p className="text-gray-500">{totalBtc?.toFixed(12)} BTC</p>
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

      {/* <div className="bg-gray-900 p-4 rounded-lg mb-4">
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
        </div>
      </div> */}

      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <h2 className="text-xs text-gray-400 mb-5">BTC Rate</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Current BTC Rate</p>
            <p>
              {currentBtcRate !== null ? (
                <span>₹ {currentBtcRate?.toFixed(2)}</span>
              ) : (
                <span>Loading BTC rate...</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg mb-16">
        <p className="text-xs text-gray-400">Miners</p>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex justify-between items-center">
            <p>Online</p>
            <p>2</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Offline</p>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage2;
