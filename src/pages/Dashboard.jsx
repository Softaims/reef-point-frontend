import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import CampaignTable from "../components/Dashboard/CampaignTable";
import { mockCampaigns } from "../data/mockCampaigns";
import { Plus, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    {
      name: "Total Campaigns",
      value: "12",
      change: "+2.5%",
      changeType: "increase",
      icon: Activity,
    },
    {
      name: "Active Users",
      value: "8,549",
      change: "+12.3%",
      changeType: "increase",
      icon: Users,
    },
    {
      name: "Total Budget",
      value: "$280,000",
      change: "+8.1%",
      changeType: "increase",
      icon: DollarSign,
    },
    {
      name: "Conversion Rate",
      value: "3.24%",
      change: "-0.5%",
      changeType: "decrease",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main Content */}
      <main className="ml-64 sm:pt-[7rem] pt-[11rem] p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Marketing Campaigns
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor your marketing campaigns
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button className="text-white w-[12rem] h-[3rem] rounded-2xl bg-gradient-to-br from-[#ae27a5] to-[#742cb2] shadow-[0_5px_20px_-10px_#742cb2]  font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 text-sm lg:text-base cursor-pointer">
                <Plus className="w-4 lg:w-5 h-4 lg:h-5" />
                <span>Create Campaign</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Campaigns Table */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Campaigns
            </h2>
            <div className="flex items-center space-x-3">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Completed</option>
                <option>Draft</option>
              </select>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <CampaignTable campaigns={mockCampaigns} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
