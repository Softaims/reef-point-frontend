import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/splashscreenReeflogo.png";
import ReefIcon from "../../assets/reef-icon-48.png";

import QrCode from "../../assets/qrcodepng.png";

export default function Token() {
  // State to toggle visibility of the balance
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("tokens");

  // Toggle function for showing/hiding balance
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  // Function to handle tab click and set the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const tokenData = [
    {
      name: "REEF",
      icon: ReefIcon, // Ensure this points to the actual Reef icon component
      priceUSD: "0.004",
      totalUSD: "0.004",
      amount: "100,000",
    },
    {
      name: "REEF",
      icon: ReefIcon,
      priceUSD: "0.005",
      totalUSD: "0.005",
      amount: "100,000",
    },
    {
      name: "REEF",
      icon: ReefIcon,
      priceUSD: "0.006",
      totalUSD: "0.006",
      amount: "100,000",
    },
    {
      name: "REEF",
      icon: ReefIcon,
      priceUSD: "0.007",
      totalUSD: "0.007",
      amount: "100,000",
    },
    {
      name: "REEF",
      icon: ReefIcon,
      priceUSD: "0.008",
      totalUSD: "0.008",
      amount: "100,000",
    },
    {
      name: "REEF",
      icon: ReefIcon,
      priceUSD: "0.009",
      totalUSD: "0.009",
      amount: "100,000",
    },
    {
      name: "REEF",
      icon: ReefIcon,
      priceUSD: "0.010",
      totalUSD: "0.010",
      amount: "100,000",
    },
    {
      name: "REEF",
      icon: ReefIcon,
      priceUSD: "0.011",
      totalUSD: "0.011",
      amount: "100,000",
    },
    {
      name: "REEF",
      icon: ReefIcon,
      priceUSD: "0.012",
      totalUSD: "0.012",
      amount: "100,000",
    },
    {
      name: "REEF",
      icon: ReefIcon,
      priceUSD: "0.013",
      totalUSD: "0.013",
      amount: "100,000",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#2C024D]">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex items-center gap-2 justify-center">
          <div className="max-w-4xl mx-auto">
            <img
              src={Logo}
              alt="Reef Logo"
              className="w-[100px] h-auto sm:w-[120px]"
            />
          </div>
          <div className="bg-[#D9D9D9] rounded-3xl w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl justify-center flex md:text-2xl">
              iamthereefgod.reef
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <img
              src={QrCode}
              alt="Reef Logo"
              className="w-[100px] h-auto sm:w-[120px]"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#D9D9D9] rounded-t-[32px] md:rounded-b-[32px] w-full  md:w-[70%] lg:w-[80%] md:mx-auto md:mb-8 pt-8 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="flex gap-2">
            <h2 className="text-3xl text-[#000000]">Balance</h2>
            {/* Eye Icon to toggle balance visibility */}
            <button
              aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}
              onClick={toggleBalanceVisibility}
              className="text-xl text-[#000000]"
            >
              {isBalanceVisible ? (
                <FaEyeSlash className="text-white text-2xl" /> // Show eye with slash when balance is hidden
              ) : (
                <FaEye className="text-white" /> // Show eye icon when balance is visible
              )}
            </button>
          </div>

          <div className="flex items-center justify-center text-[#000000] text-3xl font-normal">
            <span>$</span>
            <h1 className="">{isBalanceVisible ? "1000" : "****"}</h1>{" "}
          </div>

          <div className="bg-[#A29696] rounded-[12px] max-w-[100%] mx-auto">
            <div className="px-6 py-2 flex items-center justify-between">
              {/* Tabs for Tokens and Collectibles */}
              <div
                onClick={() => handleTabClick("tokens")}
                className={`px-8 py-2 rounded-[10px] cursor-pointer ${
                  activeTab === "tokens" ? "bg-[#D9D9D9]" : "bg-transparent"
                }`}
              >
                Tokens
              </div>
              <div
                onClick={() => handleTabClick("collectibles")}
                className={`px-8 py-2 rounded-[10px] cursor-pointer ${
                  activeTab === "collectibles"
                    ? "bg-[#D9D9D9]"
                    : "bg-transparent"
                }`}
              >
                Collectibles
              </div>
            </div>
          </div>
        </div>
        {/* Tabs content */}
        {tokenData.map((token, index) => (
          <div
            key={index}
            className="flex justify-between mt-6 bg-[#A29696] rounded-2xl px-2"
          >
            {/* left side */}
            <div className="flex items-center gap-4 p-2">
              <img src={token.icon} alt={token.name} />
              <div className="flex flex-col items-center justify-center text-white">
                <h2 className="md:text-3xl text-2xl font-semibold">
                  {token.name}
                </h2>
                <div className="flex text-[12px] md:text-2xl">
                  <span>$</span>
                  <h2>{token.priceUSD}</h2>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col px-2 items-center justify-center text-white">
              <div className="flex md:text-3xl text-2xl font-semibold">
                <span>$</span>
                <h2>{token.totalUSD}</h2>
              </div>
              <div className="flex gap-2 text-[12px] md:text-2xl">
                <span>{token.amount}</span>
                <h2>{token.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
