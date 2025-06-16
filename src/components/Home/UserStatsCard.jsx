import { FaArrowUp } from "react-icons/fa";

export default function UserStatsCard() {
  return (
    <div className="bg-[#A93185] text-white p-6 rounded-lg">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4">Your Rank</h3>

      {/* Rank Number with superscript "of" text */}
      <div className="relative mb-6">
        <span className="text-[40px] font-normal">22,011</span>
        <span className="text-[20px] text-white absolute top-0 ml-4 -translate-y-1">
          of 160,001
        </span>
      </div>

      {/* Stats */}
      <div className="space-y-3 text-[18px]">
        <div className="flex justify-between items-center">
          <span className="text-[#FFFFFF]">Weekly change</span>
          <span className="font-normal flex items-center gap-1">
            1<FaArrowUp className="text-xs text-green-300" />
          </span>
        </div>

        <div className="flex justify-between items-center text-[18px]">
          <span className="text-[#FFFFFF]">Action points</span>
          <span className="font-normal">203,958</span>
        </div>

        <div className="flex justify-between items-center text-[18px]">
          <span className="text-[#FFFFFF]">Referral points</span>
          <span className="font-normal">0.00</span>
        </div>
      </div>
    </div>
  );
}
