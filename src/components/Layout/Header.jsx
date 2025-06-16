import headerLogo from "../../assets/header-logo-reef.png";
import ReefIcon from "../../assets/reef-icon-32.png";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Uik from "@reef-chain/ui-kit";

export default function Header() {
  const { Button } = Uik;

  return (
    <header className="w-full bg-[#EEEBF6] border-b border-gray-200 px-4 py-3 shadow-2xl">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section - LEFT SIDE */}
        <div className="flex items-center space-x-2">
          <img src={headerLogo} alt="Reef-swap" width={131} height={44} />
        </div>

        {/* All other elements - RIGHT SIDE */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 font-poppins text-[16px] font-semibold">
            <Link to="/points" className="text-[#000000] transition-colors">
              Points
            </Link>
            <Link to="/docs" className="text-[#000000] transition-colors">
              Docs
            </Link>
            <Link
              to="/tokens"
              className="bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
            >
              Tokens
            </Link>
            <Link to="/pools" className="text-gray-400">
              Pools
            </Link>
            <Link to="/creator" className="text-gray-400">
              Creator
            </Link>
          </nav>

          {/* REEF Badge */}
          <div className="flex w-fit overflow-hidden shadow-md rounded-full">
            {/* Left Section */}
            <div className="flex items-center gap-2 bg-[#F4F1FC] pl-2 pr-4 py-2.5">
              {/* Gradient Logo Circle */}
              <img src={ReefIcon} alt="" width={20} height={20} />

              {/* REEF Balance Text */}
              <span className="text-[16px] font-extrabold bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent tracking-tight">
                1151495 REEF
              </span>
            </div>

            {/* Right Section (with full curve on left and right) */}
            <div className="flex items-center bg-gradient-to-r from-[#A93185] to-[#5D3BAD] px-3 py-2.5 rounded-l-full rounded-r-full">
              <span className="text-white text-[16px] font-medium">Anon 1</span>
            </div>
          </div>

          {/* Settings Icon */}
          <button className="p-2 text-[#A93185] hover:text-[##000000] transition-colors cursor-pointer">
            <Uik.Icon icon={faCog} />
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-500 hover:text-[##000000]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
