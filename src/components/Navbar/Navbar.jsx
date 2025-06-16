import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 font-poppins text-[14px] lg:text-[16px] font-semibold">
      <Link
        to="/points"
        className="text-[#000000] hover:text-[#A93185] transition-colors"
      >
        Points
      </Link>
      <Link
        to="/docs"
        className="text-[#000000] hover:text-[#A93185] transition-colors"
      >
        Docs
      </Link>
      <Link
        to="/tokens"
        className="bg-gradient-to-r from-[#A93185] to-[#5D3BAD] bg-clip-text text-transparent"
      >
        Tokens
      </Link>
      <Link
        to="/pools"
        className="text-gray-400 hover:text-[#000000] transition-colors"
      >
        Pools
      </Link>
      <Link
        to="/creator"
        className="text-gray-400 hover:text-[#000000] transition-colors"
      >
        Creator
      </Link>
    </nav>
  );
}
