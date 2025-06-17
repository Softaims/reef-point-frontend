import React, { useState } from "react";
import Logo from "../../../assets/splashscreenReeflogo.png";
import { Link } from "react-router-dom";

export default function CreateAccount() {
  const [backupToCloud, setBackupToCloud] = useState("");
  const [useBiometric, setUseBiometric] = useState("");
  const [accountNickname, setAccountNickname] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[#2C024D]">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <img
            src={Logo}
            alt="Reef Logo"
            className="w-[100px] h-auto sm:w-[120px]"
          />
        </div>
      </div>
      {/* Content Container - Full Width Gray Background */}
      <div className="flex-1 bg-[#D9D9D9] rounded-t-[32px] md:rounded-b-[32px] w-full  md:w-[70%] lg:w-[50%] md:mx-auto md:mb-8 pt-8 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-md mx-auto lg:max-w-2xl">
          <div className="rounded-xl p-6 sm:p-8 space-y-8">
            {/* Account Address */}
            <div className="space-y-2">
              <h3 className="text-[#000000] text-base sm:text-lg font-bold">
                Account Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-800 text-sm font-mono break-all">
                  5p108324jalsdjflasddlkajsdfjfjasi2332
                </p>
              </div>
            </div>

            {/* Backup to Cloud */}
            <div className="space-y-2">
              <h3 className="text-black text-base sm:text-lg font-bold">
                Backup to Cloud
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

            {/* Nickname */}
            <div className="space-y-2">
              <h3 className="text-black text-base sm:text-lg font-bold">
                Account Nickname
              </h3>
              <input
                type="text"
                value={accountNickname}
                onChange={(e) => setAccountNickname(e.target.value)}
                className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Enter nickname"
              />
            </div>

            {/* Biometric Auth */}
            <div className="space-y-2">
              <h3 className="text-[#000000] text-base sm:text-lg font-bold">
                Use facial/fingerprint authentication
              </h3>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="biometric"
                    value="yes"
                    checked={useBiometric === "yes"}
                    onChange={(e) => setUseBiometric(e.target.value)}
                    className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-black font-medium text-sm">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="biometric"
                    value="no"
                    checked={useBiometric === "no"}
                    onChange={(e) => setUseBiometric(e.target.value)}
                    className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-black font-medium text-sm">No</span>
                </label>
              </div>
            </div>

            {/* Button */}
            <Link to="/create-account/step-2">
              <div className="pt-6 w-[50%] mx-auto">
                <button
                  type="button"
                  className="w-full cursor-pointer bg-[#A29696] hover:bg-[#8B7C7C] text-black font-medium text-lg h-[50px] px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
                >
                  Next
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
