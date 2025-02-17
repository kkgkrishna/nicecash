import React from "react";
import { FaBell } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { MdQrCodeScanner } from "react-icons/md";
import Button from "../CustomPage/Button";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";

function DashboardPage() {
  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <FaBell className="text-gray-400 text-xl" />
          <MdQrCodeScanner className={`text-primaryColor text-xl`} />
        </div>
      </div>

      {/* Wallet Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <h2 className="text-xs text-gray-400">Total Assets</h2>
        <p className="text-3xl font-bold">INR 0.00</p>
        <p className="text-gray-500">0.00000000 BTC</p>
        <div className="flex gap-3 mt-4">
          <Button
            hasIcon
            label={`Scan`}
            className={`text-xs text-primaryColor border-primaryColor `}
          >
            <MdQrCodeScanner className={`text-primaryColor `} />
          </Button>

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

      {/* Balance Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <p className="text-xs text-gray-400 ">Balance</p>
        <div className="flex flex-col gap-5 mt-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <IoWalletOutline
                className={`border border-primaryColor p-1.5 rounded-full text-3xl bg-[#f9debc] text-primaryColor`}
              />
              <p className=""> Available Balance</p>
            </div>
            <div className="text-end">
              <p className="text-xs font-bold">INR 0.00</p>
              <p className="text-gray-500 text-xsm">0.00000000 BTC</p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <IoWalletOutline
                className={`border border-primaryColor p-1.5 rounded-full text-3xl`}
              />
              <p className=""> Available Balance</p>
            </div>
            <div className="text-end">
              <p className="text-xs font-bold">INR 0.00</p>
              <p className="text-gray-500 text-xsm">0.00000000 BTC</p>
            </div>
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

      {/* Mining Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <h2 className="text-xs text-gray-400">Mining</h2>
        <p>No rigs connected yet</p>
        <div className="flex justify-between mt-4">
          <button className="bg-[#${}] text-primaryColor px-4 py-2 rounded">
            Scan QR Code
          </button>
          <button className="bg-[#${}] text-primaryColor px-4 py-2 rounded">
            Mining Address
          </button>
        </div>
      </div>

      {/* Hash Power Buying Section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-16">
        <h2 className="text-xs text-gray-400">Hash Power Buying</h2>
        <p>You don't have hashpower buying enabled yet.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          commodi cupiditate provident odio illum enim, pariatur itaque facilis
          recusandae voluptatum, maxime architecto ab, repellendus nemo
          voluptate. Modi saepe obcaecati labore. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Odio accusantium quaerat maxime deserunt
          beatae saepe dolores soluta magni voluptatibus. Numquam harum unde,
          ipsam porro laboriosam tenetur voluptate quia nobis totam. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Atque eaque at
          dolores mollitia sunt quibusdam, libero fuga amet, nam saepe veritatis
          rerum ad, aspernatur laudantium quae tenetur! Quae, cumque molestias.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
          illo ducimus esse ab dolores soluta provident maiores, fugiat delectus
          aliquam numquam tempore ratione reiciendis enim distinctio minus quos
          adipisci impedit! lo Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Cumque commodi cupiditate provident odio illum enim,
          pariatur itaque facilis recusandae voluptatum, maxime architecto ab,
          repellendus nemo voluptate. Modi saepe obcaecati labore. Lorem ipsum
          dolor sit, amet consectetur adipisicing elit. Odio accusantium quaerat
          maxime deserunt beatae saepe dolores soluta magni voluptatibus.
          Numquam harum unde, ipsam porro laboriosam tenetur voluptate quia
          nobis totam. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Atque eaque at dolores mollitia sunt quibusdam, libero fuga amet, nam
          saepe veritatis rerum ad, aspernatur laudantium quae tenetur! Quae,
          cumque molestias. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Aliquid, illo ducimus esse ab dolores soluta provident maiores,
          fugiat delectus aliquam numquam tempore ratione reiciendis enim
          distinctio minus quos adipisci impedit! lo
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
