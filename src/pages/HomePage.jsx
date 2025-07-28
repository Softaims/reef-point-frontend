import Header from "../components/Layout/Header";
import SeasonBanner from "../components/Home/SeasonBanner";
import LeaderboardTable from "../components/Home/LeaderboardTable";
import { useEffect, useState } from "react";
import apiService from "../api/apiService";
import UserStatsCard from "../components/Home/UserStatsCard";
import ReferralCodeCard from "../components/Home/ReferralCodeCard";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getLeaderboardPoints();
        setLeaderboard(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <>
      <div className="min-h-screen ">
        <Header />
        <div className="main  max-w-7xl mx-auto p-4 sm:p-4 lg:p-16 ">
          <h1 className="text-2xl font-bold text-gray-900 my-8">
            ReefSwap Points
          </h1>
          <SeasonBanner />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {loading ? (
                <div className="py-12 text-center text-gray-500">
                  Loading leaderboard...
                </div>
              ) : error ? (
                <div className="py-12 text-center text-red-500">{error}</div>
              ) : (
                <LeaderboardTable data={leaderboard} />
              )}
            </div>
            <div className="space-y-12 mt-16">
              <UserStatsCard />
              <ReferralCodeCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
