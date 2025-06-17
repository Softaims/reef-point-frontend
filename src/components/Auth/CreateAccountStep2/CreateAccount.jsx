import React, { useState } from "react";
import Logo from "../../../assets/splashscreenReeflogo.png";
import { Link } from "react-router-dom";

export default function CreateAccount() {
  const [backupToCloud, setBackupToCloud] = useState("");
  const [accountNickname, setAccountNickname] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[#2C024D]">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <img
            src={Logo}
            alt="Reef Logo"
            className="w-[120px] h-auto sm:w-[140px] "
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 bg-[#D9D9D9] rounded-t-[32px] md:rounded-b-[32px] w-full md:w-[70%] lg:w-[50%] md:mx-auto md:mb-8 pt-8 px-4 sm:px-6 lg:px-8 pb-10 flex flex-col  items-center">
        <div className="max-w-md mx-auto lg:max-w-2xl">
          <div className="rounded-xl py-6 px-2 sm:py-8 space-y-8">
            {/* Claim Free Username */}
            <div className="space-y-4">
              <h3 className="text-[#000000] text-[16px] sm:text-lg font-bold">
                Would you like to claim a free username?
              </h3>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="backup"
                    value="yes"
                    checked={backupToCloud === "yes"}
                    onChange={(e) => setBackupToCloud(e.target.value)}
                    className="w-5 h-5 text-[#2C024D] border-gray-300 focus:ring-[#2C024D]"
                  />
                  <span className="text-black font-medium text-sm">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="backup"
                    value="no"
                    checked={backupToCloud === "no"}
                    onChange={(e) => setBackupToCloud(e.target.value)}
                    className="w-5 h-5 text-[#2C024D] border-gray-300 focus:ring-[#2C024D]"
                  />
                  <span className="text-black font-medium text-sm">No</span>
                </label>
              </div>
            </div>

            {/* Nickname Display */}
            <div className="space-y-2">
              <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 text-sm focus:ring-2 focus:ring-[#2C024D] outline-none">
                {accountNickname || "iamthereefgod.reef"}
              </div>
            </div>

            {/* Claim Button */}
            <div className="pt-8 w-[60%] mx-auto">
              <Link to="/token">
                <button
                  type="button"
                  className="w-full bg-[#A29696] cursor-pointer hover:bg-[#8B7C7C] text-black font-medium text-lg h-[50px] px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
                >
                  Claim
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
