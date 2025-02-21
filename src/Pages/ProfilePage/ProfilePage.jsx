import React from "react";
import { FaUserCircle, FaCog, FaPowerOff } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import Button from "../CustomPage/Button";
import { useNavigate } from "react-router-dom";

function ProfilePage({ f2PollAlData }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("LogOut Call");
    localStorage.clear();
    navigate("/login");
  };

  const user = {
    name: "KRISHNA KUMAR GAUTAM",
    email: "krishna@example.com",
    gender: "Male",
    aadhar: "1234-5678-9012",
    fatherName: "RAMESH KUMAR GAUTAM",
    bankDetails: {
      accountNo: "123456789012",
      ifsc: "SBIN0001234",
      branch: "State Bank of India, Delhi",
    },
  };

  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex items-center gap-4">
          <FaCog className="text-gray-400 text-xl" />
          <MdQrCodeScanner className="text-yellow-500 text-xl" />
          <FaPowerOff
            className="text-red-500 text-xl"
            onClick={() => handleLogout()}
          />
        </div>
      </div>

      {/* User Info */}
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-yellow-500 text-5xl" />
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>

      {/* personal info */}
      <div className="bg-gray-900 p-4 rounded-lg mb-5">
        <h2 className="text-sm text-gray-400 mb-5">Personal Details</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-semibold">Gender</p>
            <p className=""> {user?.gender}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold">Aadhar No</p>
            <p className="">{user?.aadhar}</p>
          </div>

          <div className="flex justify-between ">
            <p className="font-semibold">Father's Name</p>
            <p className=""> {user?.fatherName}</p>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-gray-900 p-4 rounded-lg mb-16">
        <h2 className="text-sm text-gray-400 mb-5">Bank Details</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-semibold">Account No</p>
            <p className=""> {user?.bankDetails?.accountNo}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold">IFSC Code</p>
            <p className="">{user?.bankDetails?.ifsc}</p>
          </div>

          <div className="flex justify-between ">
            <p className="font-semibold">Branch Name</p>
            <p className=""> {user?.bankDetails?.branch}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
