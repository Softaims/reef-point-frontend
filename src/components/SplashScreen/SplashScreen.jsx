import splashScreen from "../../assets/splashscreen.png";
import Logo from "../../assets/splashscreenReeflogo.png";
import { Link } from "react-router-dom";
export default function SplashScreen() {
  return (
    <div className="bg-[#2C024D] flex flex-col justify-between px-6 pt-10 pb-0 mb-0">
      {/* Top Section - Logo and Content */}
      <div className="flex flex-col items-center pt-8">
        {/* Logo */}
        <img
          src={Logo || "/placeholder.svg"}
          alt="Reef Logo"
          className="w-[252px] h-[132px] mb-8"
        />

        {/* Tagline */}
        <div className="text-center space-y-1 mb-12">
          <p className="text-white text-[24px] font-medium">Built for You,</p>
          <p className="text-white text-[24px] font-medium">
            Ready for Everything.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-8 w-full max-w-[252px]">
          <Link to="/create-account/step-1">
            <button className="w-full cursor-pointer h-[70px] bg-[#D9D9D9] hover:bg-gray-300 text-[#000000] font-normal rounded-[25px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Create Account
            </button>
          </Link>
          <button className="w-full cursor-pointer h-[70px] bg-[#D9D9D9] hover:bg-gray-300 text-[#000000] font-normal rounded-[25px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Load Existing Account
          </button>
        </div>
      </div>

      {/* Bottom Section - Illustration */}
      <div className="flex justify-center items-end ">
        <img
          src={splashScreen}
          alt="Underwater Reef"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
