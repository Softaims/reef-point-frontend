import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import CampaignTable from "../components/Dashboard/CampaignTable";
import { mockCampaigns } from "../data/mockCampaigns";
import { Plus, Filter, Download } from "lucide-react";

const CampaignsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />

      <main className="ml-64 pt-16 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                All Campaigns
              </h1>
              <p className="text-gray-600 mt-1">
                Manage all your marketing campaigns
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create New Campaign</span>
              </button>
            </div>
          </div>
        </div>

        <CampaignTable campaigns={mockCampaigns} />
      </main>
    </div>
  );
};

export default CampaignsPage;
