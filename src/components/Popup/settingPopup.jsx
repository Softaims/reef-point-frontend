import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { FaCopy, FaCheck } from "react-icons/fa";
import accountimage from "../../assets/accountimage.png";
import { FiChevronDown } from "react-icons/fi";
import Reeficon from "../../assets/reef-icon-48.png";

export default function SettingsPopup({ isOpen, onClose }) {
  const [selectedNetwork, setSelectedNetwork] = useState("Mainnet");

  //   toggle to select the movile or browser extension
  const [isButtonOpen, setIsButton] = useState(false);
  const toggleDropdown = () => {
    setIsButton(!isButtonOpen);
  };

  // Toggle body overflow to hide scrollbar when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on unmount or when isOpen changes
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-[2000ms] ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0  bg-transparent transition-opacity duration-[2000ms] ease-in-out ${
          isOpen ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`relative w-full h-full bg-[#EEEBF6] shadow-xl transform transition-all duration-[1800ms] ease-in-out overflow-y-auto ${
          isOpen
            ? "translate-y-0 scale-y-100 opacity-100"
            : "-translate-y-full scale-y-0 opacity-0"
        }`}
        style={{
          transformOrigin: "top center",
        }}
      >
        <div className="  mx-auto max-w-[60%] pt-16">
          <div className="flex  items-center justify-between ">
            <div className="relative">
              <div
                className="flex items-center justify-center gap-1 text-white py-3 px-4 rounded-2xl bg-gradient-to-br from-[#ae27a5] to-[#742cb2] shadow-[0_5px_20px_-10px_#742cb2] cursor-pointer"
                onClick={toggleDropdown}
              >
                <FiChevronDown />
                <button className="font-medium cursor-pointer">
                  browser-extension
                </button>
                <img src={Reeficon} className="w-6 h-6" alt="" />
              </div>

              {isButtonOpen && (
                <div className="absolute top-full left-0 mt-2 w-84 bg-white shadow-xl rounded-lg py-2 z-[60]">
                  <div className="flex items-center justify-start gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <img src={Reeficon} className="w-6 h-6" alt="" />
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium text-lg text-[#ae27a5]">
                        Browser Extension
                      </span>
                      <div className=" bg-green-100 rounded-2xl">
                        <span className="text-green-500 px-4 py-2">
                          Selected
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <span className="text-lg text-[#742cb2]">Mobile App</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-8">
              {/* Network Toggle */}
              <div className="flex items-center w-44 h-12 justify-between px-3 bg-[#EEEBF6] border-2 border-[#EEEBF6] rounded-lg shadow-[0_5px_10px_0_rgba(0,0,0,0.1)] p-1">
                <button
                  onClick={() => setSelectedNetwork("Mainnet")}
                  className={` w-[50%] h-[80%] cursor-pointer  rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedNetwork === "Mainnet"
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Mainnet
                </button>
                <button
                  onClick={() => setSelectedNetwork("Testnet")}
                  className={`w-[50%] h-[80%] cursor-pointer  rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedNetwork === "Testnet"
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Testnet
                </button>
              </div>
              <div className="bg-[EEEBF6] border-4  border-[#EEEBF6]  shadow-2xl w-14 h-14 rounded-full flex items-center justify-center ">
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-black cursor-pointer transition-colors duration-500 "
                >
                  <HiX className="w-7 h-7 text-gray-500 hover:text-[#A93185]" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center flex-col gap-6 mt-16">
            <div className=" w-full h-30 rounded-2xl shadow-2xl bg-[#EEEBF6] border-2 border-[#EEEBF6]">
              <div className="flex justify-between items-center h-full px-8">
                <div className="flex items-center gap-5">
                  <div className="">
                    <img src={accountimage} className="w-16 h-16" alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className=" text-[18px] font-semibold  text-[#000000]">
                      hamza
                    </h3>
                    <div className="flex gap-2 text-gray-500 text-[14px">
                      <h4 className="">Native address</h4>
                      <h4>5gnjkn...61uinl</h4>
                      <button className=" cursor-pointer">
                        <FaCopy />
                      </button>
                    </div>
                    <a href="" className=" text-[#A93185] text-sm">
                      Open in Explorer
                    </a>
                  </div>
                </div>
                <div className=" text-white py-3 px-4 rounded-2xl bg-gradient-to-br from-[#ae27a5] to-[#742cb2] shadow-[0_5px_20px_-10px_#742cb2]">
                  <button className="font-medium">select</button>
                </div>
              </div>
            </div>
            <div className=" w-full h-30 rounded-2xl shadow-2xl bg-[#EEEBF6] border-2 border-[#EEEBF6]">
              <div className="flex justify-between items-center h-full px-8">
                <div className="flex items-center gap-5">
                  <div className="">
                    <img src={accountimage} className="w-16 h-16" alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className=" text-[18px] font-semibold  text-[#000000]">
                      hamza
                    </h3>
                    <div className="flex gap-2 text-gray-500 text-[14px">
                      <h4 className="">Native address</h4>
                      <h4>5gnjkn...61uinl</h4>
                      <button className=" cursor-pointer">
                        <FaCopy />
                      </button>
                    </div>
                    <a href="" className=" text-[#A93185] text-sm">
                      Open in Explorer
                    </a>
                  </div>
                </div>
                <div className=" text-white py-3 px-4 rounded-2xl bg-gradient-to-br from-[#ae27a5] to-[#742cb2] shadow-[0_5px_20px_-10px_#742cb2]">
                  <button className="font-medium">select</button>
                </div>
              </div>
            </div>
            <div className=" w-full h-30 rounded-2xl shadow-2xl bg-[#EEEBF6] border-2 border-[#EEEBF6]">
              <div className="flex justify-between items-center h-full px-8">
                <div className="flex items-center gap-5">
                  <div className="">
                    <img src={accountimage} className="w-16 h-16" alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className=" text-[18px] font-semibold  text-[#000000]">
                      hamza
                    </h3>
                    <div className="flex gap-2 text-gray-500 text-[14px">
                      <h4 className="">Native address</h4>
                      <h4>5gnjkn...61uinl</h4>
                      <button className=" cursor-pointer">
                        <FaCopy />
                      </button>
                    </div>
                    <a href="" className=" text-[#A93185] text-sm">
                      Open in Explorer
                    </a>
                  </div>
                </div>
                <div className=" text-white py-3 px-4 rounded-2xl bg-gradient-to-br from-[#ae27a5] to-[#742cb2] shadow-[0_5px_20px_-10px_#742cb2]">
                  <button className="font-medium">select</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
