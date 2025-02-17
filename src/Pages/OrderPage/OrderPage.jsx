import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { Utils } from "../Utils/Utils";

function OrderPage() {
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    setOrderData(Utils?.getLastNDays(20));
  }, []);

  console.log(orderData);

  const EarningArray = [
    { date: "17-Feb-2025", rupee: "1218", btc: "0.000067" },
    { date: "16-Feb-2025", rupee: "1218", btc: "0.000067" },
    { date: "15-Feb-2025", rupee: "1497", btc: "0.000066" },
    { date: "14-Feb-2025", rupee: "1200", btc: "0.000036" },
    { date: "13-Feb-2025", rupee: "1337", btc: "0.000044" },
    { date: "12-Feb-2025", rupee: "1133", btc: "0.000031" },
    { date: "11-Feb-2025", rupee: "812", btc: "0.000053" },
    { date: "10-Feb-2025", rupee: "1092", btc: "0.000074" },
    { date: "09-Feb-2025", rupee: "827", btc: "0.000068" },
    { date: "08-Feb-2025", rupee: "1090", btc: "0.00009" },
    { date: "07-Feb-2025", rupee: "1280", btc: "0.000017" },
    { date: "06-Feb-2025", rupee: "1217", btc: "0.00007" },
    { date: "05-Feb-2025", rupee: "1069", btc: "0.000023" },
    { date: "04-Feb-2025", rupee: "1483", btc: "0.00009" },
    { date: "03-Feb-2025", rupee: "1405", btc: "0.000089" },
    { date: "02-Feb-2025", rupee: "1089", btc: "0.000037" },
    { date: "01-Feb-2025", rupee: "1444", btc: "0.000080" },
    { date: "31-Jan-2025", rupee: "1398", btc: "0.000062" },
    { date: "30-Jan-2025", rupee: "1199", btc: "0.000050" },
    { date: "29-Jan-2025", rupee: "959", btc: "0.000082" },
  ];
  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center gap-4">
          <FaCog className="text-gray-400 text-xl" />
          <MdQrCodeScanner className="text-yellow-500 text-xl" />
        </div>
      </div>

      {/* Holdings Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-16">
        <h2 className="text-sm text-gray-400 mb-5">Your Earning</h2>
        {EarningArray?.map((data, index) => (
          <div
            key={index}
            className={`flex justify-between items-center mt-2  border-gray-700 pb-2 ${
              EarningArray?.length - 1 === index ? "border-none" : "border-b"
            }`}
          >
            <div className="flex flex-col  ">
              {/* <div className="w-4 h-4 bg-green-500 rounded-full"></div> */}
              <span className="text-lg">
                {Utils?.getLast10DaysFromDate(data?.date)?.[0]?.date}
              </span>
              <span className="text-xs">
                ({Utils?.getLast10DaysFromDate(data?.date)?.[0]?.day})
              </span>
            </div>
            <div className="text-end">
              <p className="text-lg">₹{data?.rupee}</p>
              <p className="text-sm">{data?.btc} BTC</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
