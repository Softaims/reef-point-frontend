import { useState } from "react";
import { useLocation } from "react-router-dom";
import headerLogo from "../../assets/header-logo-reef.png";
import ReefIcon from "../../assets/reef-icon-32.png";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Uik from "@reef-chain/ui-kit";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";
import SettingsPopup from "../Popup/settingPopup";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const toggleSettingsPopup = () => {
    console.log("clicked");
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <header className="w-full sticky top-0 bg-[#F7F5FB] py-3 shadow-[0_8px_20px_rgba(172,138,199,0.12)] z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-4 lg:px-16">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img
            src={headerLogo}
            alt="Reef-swap"
            className="w-20 h-auto sm:w-32"
            width={131}
            height={44}
          />
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 font-poppins text-[14px] lg:text-[16px] font-semibold">
            <Link
              to="/points"
              className={`transition-colors ${
                location.pathname === "/"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-[#000000] hover:text-[#A93185]"
              }`}
            >
              Points
            </Link>
            <Link
              to="/docs"
              className={`transition-colors ${
                location.pathname === "/docs"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-[#000000] hover:text-[#A93185]"
              }`}
            >
              Docs
            </Link>
            <Link
              to="/tokens"
              className={`transition-colors ${
                location.pathname === "/tokens"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-[#000000] hover:text-[#A93185]"
              }`}
            >
              Tokens
            </Link>
            <Link
              to="/pools"
              className={`transition-colors ${
                location.pathname === "/pools"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-gray-400 hover:text-[#A93185]"
              }`}
            >
              Pools
            </Link>
            <Link
              to="/creator"
              className={`transition-colors ${
                location.pathname === "/creator"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-gray-400 hover:text-[#A93185]"
              }`}
            >
              Creator
            </Link>
          </nav>

          {/* REEF Badge */}
          <div className="flex w-fit overflow-hidden bg-gradient-to-br from-[#F4F1FC] to-[#F7F6FC] shadow-md rounded-full">
            <div className="flex items-center gap-2 pl-2 pr-4 py-2.5">
              <img src={ReefIcon} alt="" width={20} height={20} />
              <span className="text-[16px] font-extrabold bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent tracking-tight">
                1151495 REEF
              </span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-[#A93185] to-[#5D3BAD] px-3 py-2.5 rounded-l-full rounded-r-full">
              <span className="text-white text-[16px] font-medium">Anon 1</span>
            </div>
          </div>
          <div className=" text-white py-3 px-4 rounded-2xl bg-gradient-to-br from-[#ae27a5] to-[#742cb2] shadow-[0_5px_20px_-10px_#742cb2]">
            <button className="font-medium cursor-pointer ">connect</button>
          </div>
          {/* Settings Icon */}
          <div className="w-8 h-8 flex items-center justify-center shadow-md rounded-full bg-[#F4F1FC]">
            <button
              className="flex items-center justify-center text-[#A93185] hover:text-black transition-colors cursor-pointer w-full h-full"
              onClick={toggleSettingsPopup}
            >
              <Uik.Icon icon={faCog} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Right Section */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile REEF Badge with Username */}
          <div className="flex w-fit overflow-hidden bg-gradient-to-br from-[#F4F1FC] to-[#F7F6FC] shadow-md rounded-full">
            <div className="flex items-center gap-1 pl-1.5 pr-2 py-1.5">
              <img src={ReefIcon} alt="" width={16} height={16} />
              <span className="text-[11px] font-extrabold bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent tracking-tight">
                1151495
              </span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-[#A93185] to-[#5D3BAD] px-2 py-1.5 rounded-l-full rounded-r-full">
              <span className="text-white text-[11px] font-medium">Anon 1</span>
            </div>
          </div>

          {/* Settings Icon */}
          <div className="w-5 h-5 flex items-center justify-center shadow-lg rounded-full bg-[#F4F1FC]">
            <button
              className="p-2 text-[#A93185] hover:text-black transition-colors cursor-pointer"
              onClick={toggleSettingsPopup} // Added onClick handler
            >
              <HiCog6Tooth className="text-[#A93185] w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 cursor-pointer text-gray-500 hover:text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#EEEBF6] border-t border-gray-200 py-4">
          <nav className="flex flex-col space-y-4 font-poppins text-[16px] font-semibold">
            <Link
              to="/"
              className={`transition-colors py-2 px-3 rounded-md hover:bg-[#E4DFF0] ${
                location.pathname === "/"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-[#000000]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Points
            </Link>
            <Link
              to="/docs"
              className={`transition-colors py-2 px-3 rounded-md hover:bg-[#E4DFF0] ${
                location.pathname === "/docs"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-[#000000]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              to="/tokens"
              className={`transition-colors py-2 px-3 rounded-md hover:bg-[#F3E8F7] ${
                location.pathname === "/tokens"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-[#000000]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tokens
            </Link>
            <Link
              to="/pools"
              className={`transition-colors py-2 px-3 rounded-md hover:bg-[#E4DFF0] ${
                location.pathname === "/pools"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-gray-400"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pools
            </Link>
            <Link
              to="/creator"
              className={`transition-colors py-2 px-3 rounded-md hover:bg-[#E4DFF0] ${
                location.pathname === "/creator"
                  ? "bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
                  : "text-gray-400"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Creator
            </Link>
          </nav>
        </div>
      )}
      <SettingsPopup isOpen={isSettingsOpen} onClose={toggleSettingsPopup} />
    </header>
  );
}
