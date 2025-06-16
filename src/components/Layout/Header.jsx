import { useState } from "react";
import headerLogo from "../../assets/header-logo-reef.png";
import ReefIcon from "../../assets/reef-icon-32.png";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Uik from "@reef-chain/ui-kit";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#EEEBF6] border-b border-gray-200 px-4 py-3 shadow-2xl">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
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
          <Navbar />

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

          {/* Settings Icon */}
          <div className=" w-8 h-8 flex items-center justify-center shadow-md rounded-full bg-[#F4F1FC]">
            <button className="p-2 text-[#A93185] hover:text-black transition-colors cursor-pointer">
              <Uik.Icon icon={faCog} />
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
          <div className=" w-5 h-5 flex items-center justify-center shadow-lg rounded-full bg-[#F4F1FC]">
            <button className="p-2 text-[#A93185] hover:text-black transition-colors cursor-pointer">
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
        <div className="md:hidden bg-[#EEEBF6] border-t border-gray-200  py-4">
          <nav className="flex flex-col space-y-4 font-poppins text-[16px] font-semibold">
            <Link
              to="/points"
              className="text-[#000000] transition-colors py-2 px-3 rounded-md hover:bg-[#E4DFF0]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Points
            </Link>
            <Link
              to="/docs"
              className="text-[#000000] transition-colors py-2 px-3 rounded-md hover:bg-[#E4DFF0]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              to="/tokens"
              className="bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent py-2 px-3 rounded-md hover:bg-[#F3E8F7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tokens
            </Link>
            <Link
              to="/pools"
              className="text-gray-400 py-2 px-3 rounded-md hover:bg-[#E4DFF0]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pools
            </Link>
            <Link
              to="/creator"
              className="text-gray-400 py-2 px-3 rounded-md hover:bg-[#E4DFF0]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Creator
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
